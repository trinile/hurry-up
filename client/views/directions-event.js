import React, {
  Text,
  View,
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';


//const windowSize = Dimensions.get('window');

/*

  Example directions object:
  {
    steps: [
       {
          instructions: 'Turn right on Powell',
          duration: '2'
       },
       {
          instructions: 'Dodge screaming person on the right',
          duration: '1'
       }
    ]
    leg: {
      endAddress: parsedBody.routes[0].legs[0].end_address,
      startAddress: parsedBody.routes[0].legs[0].start_address,
      durationText: parsedBody.routes[0].legs[0].duration.text,
      distanceText: parsedBody.routes[0].legs[0].distance.text
    }
  }
*/
class Directions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <View>
        {
            
          this.props.display ? 
            <View>
              <Text>Starting Address: {this.props.directions.leg.startAddress}</Text> 
              <Text>Ending Address: {this.props.directions.leg.endAddress}</Text> 
              <Text>Total Time: {this.props.directions.leg.durationText}</Text> 
              <Text>Total Distance: {this.props.directions.leg.distanceText}</Text> 
            </View>

          : 
            <View>
              <Text>Starting Address:</Text> 
              <Text>Ending Address:</Text> 
              <Text>Total Time:</Text> 
              <Text>Total Distance:</Text> 
            </View>
      }
      </View>
    );
  }
};

export default Directions;
