import React, {
  Text,
  View,
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';

import {getDirections} from '../helpers/request-helpers';
import Directions from './directions-event';
import Event from './event-row';
var Icon = require('react-native-vector-icons/Ionicons');

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class AllEvents extends Component {

  constructor(props) {
    super(props);

    console.log('All Events props: ', props); 

    this.state = {
      userId: this.props.userId,
      events: this.props.events
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('all-events componentWillReceiveProps: ', nextProps);
  }

  buttonClicked() {
    //look into using websockets instead of refresh button / or state control

    this.props.getEvents();
    
  }

  getDirections(event) {
    console.log('event city = ' + event.city);
    var that = this;
    navigator.geolocation.getCurrentPosition((position) => {

      // getDirections
      getDirections(event, position, that);
      console.log('currentPosition response = ' + position);
      
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

    console.log('button clicked for directions');
  }

  displayTime(time) {
    var dateTime = time.toString();
    var hours = dateTime.substring(16,18);
    var postfix;
    if (Number(hours) > 12) {
      postfix = 'PM';
      hours = hours - 12;
    } else {
      postfix = 'AM';
    }
    var minutes = dateTime.substring(19,21);
    return hours + ':' + minutes + ' ' + postfix;
  }

  render() {

    // { console.log('inside all-event render, props = ', this.props)}
    var renderEvents = this.state.events;
    if (this.props && this.props.route && this.props.route.params && this.props.route.params.events) {
      renderEvents = this.props.route.params.events;
    }
    return (
      <View style={{flex: 1}}>
       <Image
          style={styles.bg}
          source={require('../background.png')}/>
        <ScrollView>
          {renderEvents.map((event, index) => 
            <Event key = {index} event={event}/>
          )}
          <Text style={styles.welcome}>No more events</Text>
        </ScrollView>
        <TouchableHighlight
          style={styles.button}
          onPress={this.buttonClicked.bind(this)}>
          <View>
            <Text style={styles.buttonText}>Refresh!</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  bg: {
    top: 0,
    left: 0,
    width: deviceWidth,
    position: 'absolute',
    height: deviceHeight,
  },
  EventContainer: {
    flex: 1,
    margin: 7,
    padding: 15,
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

export default AllEvents;
