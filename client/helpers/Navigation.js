import React, { 
  Platform
} from 'react-native';

import CreateEvent from '../views/create-event';
import Profile from '../views/Profile';
import Signout from '../views/Signout';

module.exports = function (scene) {
  console.log('scene ', scene);
  console.log('scene p ', scene.params);
  var componentMap = {
    'Create Event': {
      title: 'Create Event',
      name: 'Create Event',
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
    }
  }
  var component = componentMap[scene];
  var params = Platform.OS === 'ios' ? { passProps: scene.params } : scene.params;
  return Object.assign(component, params);
}
