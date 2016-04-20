import React, {
  Text,
  View,
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

// import {createUser, login} from '../helpers/request-helpers';
/*
address: "Pearl's Burgers,"
city: "San Francisco,"
earlyArrival:"300"
eventName:"Lunch"
eventTime:
"Wed Apr 20 2016 15:32:40 GMT-0700 (PDT)"
id:1
mode:"Walking"
state:"CA"
twilioSent:"false"
userId:3
*/
const windowSize = Dimensions.get('window');

class Directions extends Component {
  //has props.event
  constructor(props) {
    super(props);
    console.log(this.props.event);
    // console.log('in directions component');
  }

  render() {
    return (
      <View>
        <Text>{this.props.event.city}</Text>
      </View>

    );
  }
};


export default Directions;
