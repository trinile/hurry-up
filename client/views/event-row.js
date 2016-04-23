import React, {
  Text,
  View,
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  
} from 'react-native';

import {getAllEvents} from '../helpers/request-helpers';
import {getDirections, deleteEvent} from '../helpers/request-helpers';

import Directions from './directions-event';
import AllEvents from './all-events';

var Icon = require('react-native-vector-icons/Ionicons');
var Accordion = require('react-native-collapsible/Accordion');

const deviceWidth = Dimensions.get('window').width;

var SECTIONS = [
  {
    title: 'Directions',
    content: 'Hola',
  }
];

class Event extends Component {

  constructor(props) {
    super(props);
    // console.log('event prop', this.props.event.eventName);
    this.state = {
      directions: {
        steps: [
           {
              instructions: '',
              duration: ''
           }
        ],
        leg: {
          endAddress: '',
          startAddress: '',
          durationText: '',
          distanceText: ''
        },
        overviewPolyLines: [],
        region: {},
        markers: {}
      } 
    };
  }
  
  // getEventDirections(event) {
  //   var that = this;
  
  //   // get current position first
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     //on success, call getDirections from request-helpers
  //     getDirections(event, position, that);
  //   },
  //   (error) => console.log(error.message),
  //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});   
    

  // }

  _renderHeader(section) {

    var textPadding = {
      paddingLeft: 25
    };

    return (
      <View>
       <Text style={styles.accordianHeader}>
        <Icon name='android-walk' size={25}></Icon>
        <Text style={textPadding}>  Directions</Text>
       </Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View>
        <Directions event={this.props.event} />
      </View>
    );
  }

  removeEvent(event) {
    deleteEvent(event.id, this.props.buttonClicked);
  }

  editEvent(event) {
    this.props.editClicked(event.id);
  }

  displayTime(time) {
    var dateTime = time.toString();
    var hours = dateTime.substring(16,18);
    var postfix;
    if (Number(hours) > 12) {
      postfix = 'PM';
      hours = hours - 12;
    } else if ( Number(hours) === 12 ){
      postfix = 'PM';
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
          <Text style={styles.EventButton}><Icon name="edit" style={styles.buttonStyle} onPress={this.editEvent.bind(this, this.props.event)}></Icon></Text>
          <View style={styles.EventInput}>
            <Text style={styles.EventText}><Icon name="android-cancel" style={styles.deleteButton} onPress={this.removeEvent.bind(this, this.props.event)}></Icon> </Text>
          </View>
        </View>
        <View style={styles.EventRow}>
          <Text style={styles.EventTitle}>Event:</Text>
          <View style={styles.EventInput}>
            <Text style={styles.EventText}>{this.props.event.eventName} @ {this.displayTime(this.props.event.eventTime)} on {this.props.event.eventTime.substring(0,10)}</Text>
          </View>
        </View>
        <View style={styles.EventRow}>
          <Text style={styles.EventTitle}>Where: </Text>
          <View style={styles.EventInput}>
            <Text style={styles.EventText}>{this.props.event.address}</Text>
            <Text style={styles.EventText}>{this.props.event.city} {this.props.event.state}</Text>

          </View>
        </View>
        <View style={styles.EventRow}>
          <Text style={styles.EventTitle}>Getting there by: </Text>
          <View style={styles.EventInput}>
            <Text style={styles.EventText}>{this.props.event.mode}</Text>
          </View>
        </View>       
        <Accordion
          sections={SECTIONS}
          renderHeader={this._renderHeader.bind(this)}
          renderContent={this._renderContent.bind(this)}
         
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 0,
    // marginRight: 15,
    color: "#FFFFFF",
  },
  deleteButton : {
    borderRadius: 0,
    color: "#cc0000",
  },
  EventContainer: {
    flex: 1,
    borderColor: 'transparent',
    borderBottomColor: '#F5F5F6',
    borderBottomWidth: 1
  },
  EventRow: {
    flex: 1,
    flexDirection:'row',
    padding: 5
  },
  EventTitle: {
    margin: 5,
    fontSize: 14,
    color: '#ACB2BE',
    textDecorationLine: 'underline'
  },
  EventButton: {
    margin: 5,
    marginBottom: 0,
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

  // iconButton: {
  //   padding: 15,
  //   width: deviceWidth,
  //   alignItems: 'center',
  //   backgroundColor: '#34778A',
  // },
  padLeft: {
    paddingLeft: 25,
  },

  accordian: {
    flex: 1,
    padding: 0
  }, 

  accordianHeader: {
    padding: 10,
    fontSize: 16,
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: '#34778A',
  },
  padLeft: {
    paddingLeft: 25
  }
});

export default Event;

