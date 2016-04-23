/* Use  path 104.236.147.132 instead of localhost in production mode*/

export const sendEvent = (newEvent, cb) => {
  fetch('http://localhost:8080/api/events' , {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  })
  .then((response) => {
    console.log('Event POST response: ', response);
    if (cb) {
      console.log('do callback branch in sendEvent');
      cb();
    } else {
      console.log('callback not defined in sendEvent');
    }
  })
  .catch((error) => console.warn('Unable to send event', error));
};

export const deleteEvent = (eventId, cb) => {
  console.log('*******attempting to delete in request-helpers*********')
  fetch('http://localhost:8080/api/events/' + eventId, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({id: eventId}),
  })
  .then((response) => {
    console.log('Event DELETE response: ', response);
    if (cb) {
      console.log('do callback branch in deleteEvent');
      cb();
    } else {
      console.log('callback not defined in deleteEvent');
    }
  })
  .catch((error) => console.warn('Unable to delete event', error));
};

export const createUser = (newUser, context) => {
  fetch('http://localhost:8080/api/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
  .then((response) => {
    return response.json();
  })
  .then((actualResponse) => {
    if (actualResponse.success) {
      context.state.handleClick(actualResponse.id);
    }
  })
  .catch((error) => console.warn('Error creating user', error));
};

export const login = (user, context) => {
  fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  .then((response) => {
    return response.json();
  })
  .then((actualResponse) => {
    if (actualResponse.success) {
      context.state.handleClick(actualResponse.id);
    }
  })
  .catch((error) => console.warn('Error creating user', error));
};

export const updateLocation = (origin, context) => {
  // TODO: grab user id from login session(?)
  var userId = context.state.userId;
  fetch('http://localhost:8080/api/users/' + userId, {
    method: 'PUT' ,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ origin: origin }),
  })
  .then((response) => {
    return response.json();
  })
  .then((actualResponse) => {
    if (actualResponse.clearWatch) { 
      navigator.geolocation.clearWatch(context.watchID); 
      console.log('Location PUT response: ', actualResponse);
    }
  })
  .catch((error) => console.warn('Unable to send phone location', error));
};
 
export const getAllEvents = (context) => {
  // TODO: grab user id from login session(?)
console.log('STATED>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', context.state.userId);
  var userId = context.state.userId;
  fetch('http://localhost:8080/api/events/' + userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    return response.json();
  })
  .then((actualResponse) => {
    context.setState( { events: actualResponse } );
    console.log('All Events GET response: ', actualResponse);
  })
  .catch((error) => console.warn('Unable to get user events', error));
};

export const getDirections = (event, position, context) => {

  var directionsParams = {
    event: event,
    position: position
  };

  fetch('http://localhost:8080/api/directions', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(directionsParams)
  })
  .then((response) => {
    console.log('inside success of api/directions');
    return response.json();
  })
  .then((actualResponse) => {
    console.log('inside success actualResponse api/directions');
    //if (actualResponse.success) {
    console.log('resp of directions ', actualResponse);
    context.setState( {directions: actualResponse, toggleDirections: true });
    //}
  })
  .catch((error) => console.warn('Error creating user', error));
};
