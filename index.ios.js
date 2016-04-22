import React, {
  Text,
  View,
  Image,
  Component,
  Dimensions,
  StyleSheet,
  AppRegistry,
} from 'react-native';

import Main from './client/views/Main';
import Login from './client/views/signin';
import AllEvents from './client/views/all-events';
import CreateEvent from './client/views/create-event';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import {getAllEvents} from './client/helpers/request-helpers';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class hurryup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userId: null,
      events: []
    };
  }
  
  handleSignIn(userId) {
    this.setState({
      loggedIn: true,
      userId: userId
    }, this.getEvents.bind(this));
    this.render();
  }
  
  getEvents() {
    console.log('inside getEvents in index.ios.js');
    var that = this;
    getAllEvents(that);
  }
  
  render() {
    console.log('events in index.ios.js render: ', this.state.events);
    return (
      <View style={styles.parent}>
        <Image
          style={styles.bg}
          source={require('./client/background.png')}/>
        <Text style={styles.welcome}> 
          hurryup
        </Text>
        {this.state.loggedIn
          ? (<Main loggedIn={this.state.loggedIn} userId={this.state.userId} events={this.state.events} getEvents={this.getEvents.bind(this)} />)
          : (<Login loggedIn={this.state.loggedIn} handlePress ={this.handleSignIn.bind(this)} tabLabel=''/>)
        }
      </View>
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
