
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

import {getAllEvents} from './client/helpers/request-helpers';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class hurryup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userId: null,
      events: [],
      eventId: null,  //adding an event id here to pass for editing
      pageView: 1,  //used for setting default page/ all vs create
      resetForm: false, //to reset the create form if we leave the form
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
    var that = this;
    getAllEvents(that);
  }

  editEvent(eventId, pageView) {
    console.log('testing pageView: ', pageView)
    this.setState({
      eventId: eventId,  //this will update the eventId which will hopefully cascade to create events
      pageView: pageView, //hack to swap pages
    });
    this.render();
  }

  resetPageTest(page) {
    console.log('in on scroll: ', page);
    if (page ===1 && this.state.eventId) {
      this.editEvent(null);
      console.log('reset the eventId');
      this.setState({
        resetForm: true
      });
      this.setState({
        resetForm: false
      });
    }
  }

  render(newPage) {
    console.log('rendering index.ios  pageView: ', this.state.pageView);
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
              page={this.state.pageView===0 ? 0 : 1}
              style={{marginTop: 0, top: 0}}
              tabBarUnderlineColor="#F5F5F6"
              tabBarActiveTextColor="#F5F5F6"
              tabBarInactiveTextColor="#ACB2BE"
              tabBarBackgroundColor="transparent"
              tabBarTextStyle={{fontFamily: 'HelveticaNeue-Light', fontSize: 15}}
              onScroll = { (page) => this.resetPageTest(page)}
              >
              <CreateEvent userId = {this.state.userId} eventId = {this.state.eventId}tabLabel='Create Event' events = {this.state.events} getEvents = {this.getEvents.bind(this)} editEvent = {this.editEvent.bind(this)} resetForm = {this.state.resetForm} />
              <AllEvents userId = {this.state.userId} tabLabel='My Events' events = {this.state.events} getEvents = {this.getEvents.bind(this)} editEvent = {this.editEvent.bind(this)} />
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
