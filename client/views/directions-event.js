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

const windowSize = Dimensions.get('window');

class Directions extends Component {
  //has props.event
  constructor(props) {
    super(props);
    // console.log('in directions component');
  }


  render() {
    
    return (
      <View>
      {this.props.display ? <Text>{this.props.directions.leg.durationText}</Text> : null }

      </View>

    );
  }
};


export default Directions;
