var User         = require('../app/models/user.js');
var Users        = require('../app/collections/users.js');
var Event        = require('../app/models/event.js');
var bcrypt       = require('bcrypt');
var googleWorker = require('../workers/google-api-call.js');
var request = require('request');
var SALT_WORK_FACTOR = 10;
var API_KEYS = require('../api_keys.js');

exports.addEvent = function(req, res) {
  var mode         = req.body.mode;
  var eventName    = req.body.eventName;
  var eventTime    = req.body.eventTime;
  var address      = req.body.address;
  var city         = req.body.city;
  var state        = req.body.state;
  var earlyArrival = req.body.earlyArrival;

  // TODO: determine username on client side ? or sessions?
  var userId = req.body.userId;

  new User({ id: userId })
    .fetch()
    .then(function(user) {
      var newEvent = new Event({
        userId: user.get('id'),
        mode: mode,
        eventName: eventName,
        eventTime: eventTime,
        address: address,
        city: city,
        state: state,
        twilioSent: 'false',
        earlyArrival: earlyArrival,
      });
      newEvent.save()
        .then(function(createdEvent) {
          console.log('Created new event');
          res.status(201).send(createdEvent);
        })
        .catch(function(err) {
          console.error('Could not create new event: ', err);
          res.status(500).send(err);
        });
    })
    .catch(function(err) {
      console.error('Could not create new event: ', err);
      res.status(500).send(err);
    });
};

exports.updateUserLocation =  function(req, res) {
  var userId = req.params.id;
  var origin = req.body.origin;

  new User({ id: userId })
    .fetch()
    .then(function(user) {
      var phoneNumber = user.attributes.phoneNumber;
      user.set('origin', origin);
      user.save()
        .then(function(updatedUser) {
          Event.where({ userId: userId })
            .fetchAll({})
            .then(function(events) {
              if (events.length !== 0) {
                events.forEach(function(event) {
                  if (event.attributes.twilioSent === 'false') {
                    googleWorker(event.attributes, updatedUser.attributes.origin, phoneNumber);
                  }
                });
                console.log('Called worker for each scheduled event');
                updatedUser.clearWatch = false;
                res.status(201).send({clearWatch: false, updatedUser: updatedUser});
              } else {
                console.log("No events scheduled");
                updatedUser.clearWatch = true;
                res.status(201).send({clearWatch: true, updatedUser: updatedUser});
              }
            });
        });
    })
    .catch(function(err) {
      console.error('Could not find user in database: ', err);
      res.status(404).send(err);
    });
};

exports.getAllUserEvents = function(req, res) {
  var userId = req.params.id;

  Event.where({ userId: userId })
    .fetchAll({})
    .then(function(events) {
      console.log('Got all user\'s events for event list');
      res.send(events);
    })
    .catch(function(err) {
      console.error('Could not get all user\'s events for event list', err);
      res.status(404).send(err);
    });
};

exports.removeUserEvent = function(req, res) {
  var eventId = req.params.id;
  
  console.log('in removeUserEvent and eventId is: ', eventId);
  Event.where({ id: eventId })
    // .fetchAll({})
    .destroy({})
    .then(function(event) {
      console.log('Found 1 user event in removeUserEvent');
      res.send();
    })
    .catch(function(err) {
      console.error('Could not find user event in removeUserEvent', err);
      res.status(404).send(err);
    });
};

exports.login = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  // compare to db
  new User({ username: username })
    .fetch()
    .then(function(user) {
      if (user) {
        bcrypt.compare(password, user.get('password'), function(err, match) {
          if (err) {
            console.error(err);
            res.status(404).send(err);
          } else {
            if (match) {
              // log the user in!
              console.log('Login successful');
              res.status(201).send({id : user.attributes.id, success: true});
            } else {
              console.log('That password was incorrect');
              res.status(201).send({success: false});
            }
          }
        });
      } else {
        // user was not found... we could send them to the signup page, or
        // keep them on the login page.
        console.log('Sorry, that username is not in our database.');
      }
    });
};

exports.signup = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var phoneNumber = '+1' + req.body.phoneNumber; // Add +1 to beggining for use with twilio
  // check username against db to avoid duplicate users
  new User({ username: username })
    .fetch()
    .then(function(found) {
      if (found) {
        console.log('Sorry, that username is already in the database!');
      } else {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) {
            console.log('Could not create salt', err);
            res.status(404).send(err);
          } else {
            bcrypt.hash(password, salt, function(err, hashedPassword) {
              if (err) {
                console.log('Could not hash password', err);
                res.status(404).send(err);
              } else {
                Users.create({
                  username: username,
                  password: hashedPassword,
                  phoneNumber: phoneNumber
                })
                .then(function(user) {
                  res.status(201).send({id: user.attributes.id, success: true});
                })
                .catch(function(err) {
                  console.error('Error signing up new user', err);
                  res.status(404).send(err);
                });
              }
            });
          }
        });
      }
    });
};

exports.getEventDirections = function(req, response) {

  console.log('inside getEventDirections');

  var position = req.body.position;
  var event = req.body.event;

    //split into each field
  var originLat = position.coords.latitude;     //37.773972
  var originLong = position.coords.longitude;    //-122.431297
  //'1118FolsomStreet,SanFrancisco,CA' Doesnt actually need spaces removed, but regex practice is nice;
  var eventAddress = event.address.replace(/\s/g, '') + event.city.replace(/\s/g, '') + event.state;
  var travelMode = event.mode.toLowerCase();          //'driving';

  // Get routes time duration from Google API
  var apiRequest = 'https://maps.googleapis.com/maps/api/directions/json?' +
    'origin=' + originLat + ',' + originLong +
    '&destination=' + eventAddress +
    '&mode=' + travelMode +
    '&key=' + API_KEYS.googleAPI;

  request(apiRequest, function(err, res, body) {

    var parsedBody = JSON.parse(body);
    
    var steps = parsedBody.routes[0].legs[0].steps;

    var arrSteps = steps.map(function(step) {
      var regex = /(<([^>]+)>)/ig;
      var body = step.html_instructions;
      var result = body.replace(regex, '');
      console.log('steps regex ', result);
      return {
        instructions: result,
        duration: step.duration.text
      };
    });

    var leg = {
      endAddress: parsedBody.routes[0].legs[0].end_address,
      startAddress: parsedBody.routes[0].legs[0].start_address,
      durationText: parsedBody.routes[0].legs[0].duration.text,
      distanceText: parsedBody.routes[0].legs[0].distance.text
    };

    response.status(200).send({ steps: arrSteps, leg: leg });
  });


};
