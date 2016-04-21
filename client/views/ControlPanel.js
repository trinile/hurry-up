import React, {
  Text,
  View,
  SwitchIOS, 
  Component
} from 'react-native';

var styles = require('../styles/styles');
var Button = require('./Button');

class ControlPanel extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View style={styles.controlPanel}>
        <Text style={styles.controlPanelWelcome}>
          Control Panel
        </Text>
        <Button
          onPress={this.props.createEvent.bind(this,this.props.userId)}
          text="Create Event"
          />
      </View>
    );
  }
}

export default ControlPanel;
