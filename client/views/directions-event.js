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

import {getDirections} from '../helpers/request-helpers';

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
    }
  }

  componentDidMount() {

    var that = this;
  
    // get current position first
    navigator.geolocation.getCurrentPosition((position) => {
      //on success, call getDirections from request-helpers
      getDirections(this.props.event, position, that);
    },
    (error) => console.log(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});   

  }

  getEventDirections(event) {

    var that = this;
  
    // get current position first
    navigator.geolocation.getCurrentPosition((position) => {
      //on success, call getDirections from request-helpers
      getDirections(event, position, that);
    },
    (error) => console.log(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});   
    
  }

  render() {
    console.log('steps ', this.state.directions.steps);

     var len = this.state.directions.steps.length;
    
     //var height = 500 + (len*30);
     var containerHeight = {
       height: 500 + (len*30)
     };

     return (
      <View style={{containerHeight, flex: 1}}>
      <MapView
        style={styles.map}
        region={ this.state.directions.region}
        annotations={this.state.directions.markers.markers}
        showsUserLocation={true}
        overlays={[{
          coordinates: this.state.directions.overviewPolyLine,
          strokeColor: '#f007',
          lineWidth: 3,
        }]}
      />
        {
          <View style={styles.directions}>
            {
            /*<View style={styles.EventRow}>
            <Text style={styles.EventTitle}>Current Location: </Text>
            <View style={styles.EventInput}>
              <Text style={styles.EventText}>{this.state.directions.leg.startAddress}</Text>
            </View>
          </View>
          */
          }
            <View style={styles.EventRow}>
              <Text style={styles.EventTitle}>Total Time:  </Text>
              <View style={styles.EventInput}>
                <Text style={styles.EventText}>{this.state.directions.leg.durationText}</Text>
              </View>
            </View>

            <View style={styles.EventRow}>
              <Text style={styles.EventTitle}>Total Distance: </Text>
              <View style={styles.EventInput}>
                <Text style={styles.EventText}>{this.state.directions.leg.distanceText}</Text>
              </View>
            </View>

            <View style={styles.EventRow}>
              <Text style={styles.EventTitle}>Directions: </Text>
              </View>
            {this.state.directions.steps.map((step, index) => 
              <View style={styles.EventInput} key={index} >
                <Text style={styles.EventText}> {step.instructions} </Text>
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
    height: 500
    
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
    alignItems: 'flex-end',
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
