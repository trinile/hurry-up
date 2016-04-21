import React, { 
  Platform
} from 'react-native';

import CreateEvent from '../views/create-event';
import AllEvents from '../views/all-events';

module.exports = function (scene) {
  var componentMap = {
    'My Events': {
      title: 'My Events',
      name: 'My Events',
      component: AllEvents
    },
    'Create Event': {
      title: 'Create Event',
      name: 'Create Event',
      component: CreateEvent
    }
  }
  var component = componentMap[scene];
  var params = Platform.OS === 'ios' ? { passProps: scene.params } : scene.params;
  return Object.assign(component, params);
}
