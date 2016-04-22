import React, { 
  Platform
} from 'react-native';

import _ from 'underscore';
import CreateEvent from '../views/create-event';
import AllEvents from '../views/all-events';

module.exports = function(scene) {
  var componentMap = {
    'Create Event': {
      title: 'Create Event',
      name: 'Create Event',
      component: CreateEvent
    }
  }
  var component = componentMap[scene];
  var params = Platform.OS === 'ios' ? { passProps: scene.params } : scene.params;
  return _.extend(component, params);
}
