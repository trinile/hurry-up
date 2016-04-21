
import React, {
  Text,
  View,
  Image,
  Component,
  Dimensions,
  StyleSheet,
  AppRegistry,
  TouchableHighlight,
} from 'react-native';

import Main from './client/views/Main';
import Login from './client/views/signin';
import AllEvents from './client/views/all-events';
import CreateEvent from './client/views/create-event';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Drawer from 'react-native-drawer';
import ControlPanel from './client/views/ControlPanel';

import {getAllEvents} from './client/helpers/request-helpers';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const Button = require('./client/views/Button');

class hurryup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userId: null,
      events: [],
    };
  }
  
  handleSignIn(userId) {
    this.setState({
      loggedIn: true,
      userId: userId
    }, this.getEvents.bind(this));
    this.render();
  }

  closeControlPanel = () => {
    this._drawer.close();
  };
  
  openControlPanel = () => {
    this._drawer.open();
  }
  
  render() {
    return (
    <Drawer
      ref={(ref) => this._drawer = ref}
      type="static"
      content={<ControlPanel userId={this.state.userId} />}
      openDrawerOffset={100}
      styles={{main: {shadowColor: "#000000", shadowOpacity: 0.4, shadowRadius: 3}}}
      tweenHandler={Drawer.tweenPresets.parallax}
    >
      <Main loggedIn={this.state.loggedIn} userId={this.state.userId} handleSignIn={this.handleSignIn.bind(this)} />
    </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  bg: {
    top: 0,
    left: 0,
    width: deviceWidth,
    position: 'absolute',
    height: deviceHeight,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 25,
    marginTop: 20,
    color: '#F5F5F6',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
  },
});

AppRegistry.registerComponent('hurryup', () => hurryup);
