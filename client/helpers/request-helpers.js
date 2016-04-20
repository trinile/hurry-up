/* Use  path 104.236.147.132 instead of localhost in production mode*/

export const sendEvent = (newEvent) => {
  fetch('http://localhost:8080/api/events' , {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  })
  .then((response) => console.log('Event POST response: ', response))
  .catch((error) => console.warn('Unable to send event', error));
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
