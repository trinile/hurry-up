import React, { 
  Platform
} from 'react-native';

import CreateEvent from '../views/create-event';
import Profile from '../views/Profile';
import Signout from '../views/Signout';
import AllEvents from '../views/all-events';

module.exports = function (scene, events, getEvents, userId, callback) {
  console.log('scene ', scene);
  console.log('scene p ', scene.params);
  var componentMap = {
    'Create Event': {
      title: 'Create Event',
      name: 'Create Event',
      params: {
        events: events,
        getEvents: getEvents,
        userId: userId,
        callback: callback
      },
      component: CreateEvent
    },
    'Profile': {
      title: 'Profile',
      name: 'Profile',
      component: Profile
    },
    'Sign Out': {
      title: 'Sign Out',
      name: 'Sign Out',
      component: Signout
    },
    'All Events': {
      title: 'My Events 2',
      component: AllEvents,
      name: 'My Events',
      params: {
        events: events,
        getEvents: getEvents,
        userId: userId
      },
    }
  }
  var component = componentMap[scene];
  var params = Platform.OS === 'ios' ? { passProps: scene.params } : scene.params;
  return Object.assign(component, params);
}
