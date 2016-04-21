
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

import Login from './client/views/signin';
import AllEvents from './client/views/all-events';
import CreateEvent from './client/views/create-event';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Drawer from 'react-native-drawer';

import {getAllEvents} from './client/helpers/request-helpers';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const ControlPanel = require('./client/views/ControlPanel');
const Button = require('./client/views/Button');

class Main extends Component {
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

  render () {
    return (
      <View style={styles.parent}>
        <Image
          style={styles.bg}
          source={require('./client/background.png')}/>
        <Text style={styles.welcome}>
          hurryup
        </Text>
        {this.state.loggedIn
          ? (<ScrollableTabView
              page={1}
              style={{marginTop: 0, top: 0}}
              tabBarUnderlineColor="#F5F5F6"
              tabBarActiveTextColor="#F5F5F6"
              tabBarInactiveTextColor="#ACB2BE"
              tabBarBackgroundColor="transparent"
              tabBarTextStyle={{fontFamily: 'HelveticaNeue-Light', fontSize: 15}}>
              <CreateEvent userId = {this.state.userId} tabLabel='Create Event' events = {this.state.events} getEvents = {this.getEvents.bind(this)}/>
              <AllEvents userId = {this.state.userId} tabLabel='My Events' events = {this.state.events} getEvents = {this.getEvents.bind(this)} />
            </ScrollableTabView>)
          : (<ScrollableTabView
              style={{marginTop: 0, top: 0}}
              tabBarUnderlineColor="#F5F5F6"
              tabBarActiveTextColor="#F5F5F6"
              tabBarInactiveTextColor="#ACB2BE"
              tabBarBackgroundColor="transparent"
              tabBarTextStyle={{fontFamily: 'HelveticaNeue-Light', fontSize: 15}}>
              <Login loggedIn = {this.state.loggedIn} handlePress = {this.handleSignIn.bind(this)} tabLabel=''/>
            </ScrollableTabView>)
        }
      </View>
    );
  }
}

class hurryup extends Component {

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
      content={<ControlPanel closeDrawer={()=>{this._drawer.close()}} />}
      openDrawerOffset={100}
      styles={{main: {shadowColor: "#000000", shadowOpacity: 0.4, shadowRadius: 3}}}
      tweenHandler={Drawer.tweenPresets.parallax}
      >
        <Main />
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
