import React, {
  Text,
  View,
  SwitchIOS, 
  Component,
  NavigatorIOS,
  ToolbarAndroid,
  TouchableHighlight
} from 'react-native';

import CreateEvent from './create-event';

var styles = require('../styles/styles');
var Button = require('./Button');

class ControlPanel extends Component {
  constructor(props){
    super(props)
  }
  
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch(route.id) {
      case 'menu':
        return (<First navigator={navigator} title="menu" />);
      case 'second':
        return (<Second navigator={navigator} title="second" />);  
    }
  }
  
  render() {
    return (
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'menu',
            component: First,
            passProps: null
          }}
        />
    );
  }
}

class First extends Component {
  navSecond() {
    this.props.navigator.push({
        title: 'second',
        component: Second
    })
  }
  
  
  
  render() {
    return (
      <View style={styles.navigator}>
        <TouchableHighlight onPress={this.navSecond.bind(this)}>
          <Text>Navigate to second screen</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

class Second extends Component {
  render() {
    return (
      <View style={styles.navigator}>
        <Text>
          Second screen
        </Text>
      </View>
    );
  }
}


export default ControlPanel;
