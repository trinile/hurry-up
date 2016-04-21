import React, {
  Text,
  View,
  SwitchIOS, 
  Component,
  Navigator
} from 'react-native';

import CreateEvent from './create-event';

var styles = require('../styles/styles');
var Button = require('./Button');

class ControlPanel extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View style={styles.controlPanel}>
        <Navigator
          style={styles.container}
          initialRoute=
        
      </View>
    );
  }
}

export default ControlPanel;
