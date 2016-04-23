import React, {
  ActivityIndicatorIOS,
  Text,
  View,
  Component,
  Dimensions,
  ScrollView,
  MapView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

var TimerMixin = require('react-timer-mixin');
const windowSize = Dimensions.get('window');

/*

  Example directions object:
  {
    steps: [
       {
          instructions: 'Turn right on Powell',
          duration: '2 mins'
       },
       {
          instructions: 'Dodge screaming person on the right',
          duration: '1 mins'
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
    this.state = {
      animating: true,
    }
  }

  componentDidMount() {
    this.render();
  }
  // mixins: [TimerMixin]

  render() {
    console.log('steps ', this.props.directions.steps);

     return (
      <View style={styles.DirectionsContainer}>
      <MapView
        style={styles.map}
        region={ this.props.directions.region}
        annotations={this.props.directions.markers.markers}
        showsUserLocation={true}
        overlays={[{
          coordinates: this.props.directions.overviewPolyLine,
          strokeColor: '#f007',
          lineWidth: 3,
        }]}
      />
        {
          <View style={styles.directions}>
            <View style={styles.EventRow}>
              <Text style={styles.EventTitle}>Total Time:  </Text>
              <View style={styles.EventInput}>
                <Text style={styles.EventText}>{this.props.directions.leg.durationText}</Text>
              </View>
            </View>

            <View style={styles.EventRow}>
              <Text style={styles.EventTitle}>Total Distance: </Text>
              <View style={styles.EventInput}>
                <Text style={styles.EventText}>{this.props.directions.leg.distanceText}</Text>
              </View>
            </View>

            <View style={styles.EventRow}>
              <Text style={styles.EventTitle}>Directions: </Text>
              </View>
            {this.props.directions.steps.map((step, index) => 
              <View style={styles.EventInput} key={index} >
                <Text style={styles.EventText}> {++index}. {step.instructions} </Text>
              </View>
            )}

          </View>
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  DirectionsContainer: {
    flex: 1,
    padding: 15,
    height: 900,
  },
  directions: {
    padding: 15
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
  EventInput: {
    flex: 1,
    // alignItems: 'flex-end',
  },
  EventText: {
    flex: 1,
    margin: 5,
    fontSize: 16,
    color: '#F5F5F6',
  },
  map: {
    height: 250,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  }
});



export default Directions;