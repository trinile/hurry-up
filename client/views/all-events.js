import React, {
  Text,
  View,
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

// import {getAllEvents} from '../helpers/request-helpers';
import {getDirections} from '../helpers/request-helpers';

import Directions from './directions-event';
import Event from './event-row';
var Icon = require('react-native-vector-icons/Ionicons');

const deviceWidth = Dimensions.get('window').width;

class AllEvents extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId
    };
  }

  // componentDidMount() {
  //   var that = this;
  //   getAllEvents(that);
  // }

  buttonClicked() {
    //look into using websockets instead of refresh button / or state control
    // var that = this;
    // getAllEvents(that);
    this.props.getEvents();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
        {this.props.events.map((event, index) => 
          <Event key = {index} event={event} buttonClicked = {this.buttonClicked.bind(this)}/>
        )}
          <Text style={styles.welcome}>no more events</Text>
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
