import React, {
  Text,
  View,
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';

import {getAllEvents} from '../helpers/request-helpers';
import {getDirections} from '../helpers/request-helpers';
import navHelper from '../helpers/Navigation';
import Drawer from 'react-native-drawer';
import Menu from './Menu';
import AllEvents from './all-events';

import Directions from './directions-event';

var Icon = require('react-native-vector-icons/FontAwesome');
var hamburgerIcon = (<Icon name="rocket" size={30} color="#900" />);
const deviceWidth = Dimensions.get('window').width;

class Main extends Component {

  constructor(props) {
    super(props);
    console.log('main props: ', props);
  }
  
  _navigate(route) {
    this._navigator.replace(navHelper(route, this.props.events, this.props.getEvents, this.props.userId, this._navigate.bind(this)));
    this._drawer.close();
  }
  
  // componentWillReceiveProps(nextProps) {
  //   console.log('Main componentWillReceiveProps: ', nextProps);
    // this._navigator.replace(navHelper(route, this.props.events, this.props.getEvents, this.props.userId));
    // this.props.events = nextProps.events;
    // this.render();
  // }
  
  render() {
    console.log('props.events in Main render: ', this.props.events);
    return (
      
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={<Menu navigate={(route) => { this._navigate(route)} }/>}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={{
          drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, backgroundColor: 'white'},
          main: {paddingLeft: 3}
        }}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}>
        <NavigatorIOS
          ref={(ref) => this._navigator = ref}
          style={{flex: 1}}
          initialRoute={{
              title: 'My Events 1',
              component: AllEvents,
              leftButtonIcon: hamburgerIcon,
              passProps: {
                loggedIn: this.props.loggedIn,
                userId: this.props.userId,
                events: this.props.events,
                getEvents: this.props.getEvents,
              },
              onLeftButtonPress: () => { this._drawer.open() }
          }}/>
      </Drawer>
    );
  }
};
const styles = StyleSheet.create({
  EventContainer: {
    flex: 1,
    margin: 7,
    padding: 15,
    height: 250,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#F5F5F6',
  },
  EventRow: {
    flex: 1,
    flexDirection:'row',
  },
  EventTitle: {
    margin: 5,
    fontSize: 14,
    color: '#ACB2BE',
    textDecorationLine: 'underline'
  },
  EventInput: {
    flex: 1,
    alignItems: 'flex-end',
  },
  EventText: {
    flex: 1,
    margin: 5,
    fontSize: 16,
    color: '#F5F5F6',
  },
  welcome: {
    margin: 20,
    fontSize: 20,
    color: '#ACB2BE',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
  },
  button: {
    padding: 15,
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: '#34778A',
  },
  buttonText: {
    fontSize: 16,
    color: '#F5F5F6',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Light',
  },

  iconButton: {
    padding: 15,
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: '#34778A',
  }
});

export default Main;
