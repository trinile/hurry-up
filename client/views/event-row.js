import React, {
  Text,
  View,
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import {getAllEvents} from '../helpers/request-helpers';
import {getDirections, deleteEvent} from '../helpers/request-helpers';

import Directions from './directions-event';
import AllEvents from './all-events';

var Icon = require('react-native-vector-icons/Ionicons');

const deviceWidth = Dimensions.get('window').width;

class Event extends Component {

  constructor(props) {
    super(props);
    console.log('event prop', this.props.event.eventName);
    this.state = {
      directions: 'unknown',
      toggleDirections: false
    };
  }
  
  getDirections(event) {
    var that = this;
    if (this.state.toggleDirections) {
      this.setState({
        toggleDirections: false
      });
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        // getDirections
        getDirections(event, position, that);
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});   
    }

  }

  removeEvent(event) {
    console.log('*******************in removeEvent*****************');
    console.log(event.id);
    deleteEvent(event.id);
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
    return (
      <View style={styles.EventContainer}>
        <View style={styles.EventRow}>
          <Text style={styles.EventTitle}>Event:</Text>
          <View style={styles.EventInput}>
            <Text style={styles.EventText}>{this.props.event.eventName} @ {this.displayTime(this.props.event.eventTime)} on {this.props.event.eventTime.substring(0,10)}</Text>
          </View>
        </View>
        <View style={styles.EventRow}>
          <Text style={styles.EventTitle}>Where: </Text>
          <View style={styles.EventInput}>
            <Text style={styles.EventText}>{this.props.event.address} {this.props.event.city} {this.props.event.state}</Text>
          </View>
        </View>
        <View style={styles.EventRow}>
          <Text style={styles.EventTitle}>Getting there by: </Text>
          <View style={styles.EventInput}>
            <Text style={styles.EventText}>{this.props.event.mode}</Text>
          </View>
        </View>   
        <View style={styles.EventRow}>
          <Icon.Button name="android-cancel" backgroundColor="#cc0000" onPress={this.removeEvent.bind(this, this.props.event)}>
            <Text style={styles.buttonText}>Delete</Text>
          </Icon.Button>  
        </View>   
        <View style={styles.EventRow}>
          <Icon.Button name="android-walk" backgroundColor="#3b5998" onPress={this.getDirections.bind(this, this.props.event)}>
            <Text style={styles.buttonText}>Directions</Text>
          </Icon.Button>  
        </View>
        <Directions directions = {this.state.directions} display={this.state.toggleDirections}/>
      </View>
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


export default Event;
