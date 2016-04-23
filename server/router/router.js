var app         = require('../server-config.js');
var route       = require('./router-helpers');
var bodyParser  = require('body-parser');
var morgan = require('morgan');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.post('/api/login', route.login);

app.post('/api/signup', route.signup);

app.post('/api/events', route.addEvent);

app.get('/api/events/:id', route.getAllUserEvents);

app.delete('/api/events/:id', route.removeUserEvent);

app.post('/api/directions', route.getEventDirections);

app.put('/api/users/:id', route.updateUserLocation);

app.put('/api/events/:id', route.updateEvent);

module.exports = app;
