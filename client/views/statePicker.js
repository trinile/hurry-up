import React, {
  Text,
  View,
  Image,
  Animated,
  PickerIOS,
  TextInput,
  Component,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const PickerItemIOS     = PickerIOS.Item;
const deviceWidth       = Dimensions.get('window').width;
const deviceHeight      = Dimensions.get('window').height;
const stateNames = [
  {value: 'AK', state: 'Alaska'},
  {value: 'AL', state: 'Alabama'},
  {value: 'AR', state: 'Arkansas'},
  {value: 'AZ', state: 'Arizona'},
  {value: 'CA', state: 'California'},
  {value: 'CO', state: 'Colorado'},
  {value: 'CT', state: 'Connecticut'},
  {value: 'DE', state: 'Delaware'},
  {value: 'FL', state: 'Florida'},
  {value: 'GA', state: 'Georgia'},
  {value: 'HI', state: 'Hawaii'},
  {value: 'IA', state: 'Iowa'},
  {value: 'ID', state: 'Idaho'},
  {value: 'IL', state: 'Illinois'},
  {value: 'IN', state: 'Indiana'},
  {value: 'KS', state: 'Kansas'},
  {value: 'KY', state: 'Kentucky'},
  {value: 'LA', state: 'Louisiana'},
  {value: 'MA', state: 'Massachusetts'},
  {value: 'MD', state: 'Maryland'},
  {value: 'ME', state: 'Maine'},
  {value: 'MI', state: 'Michigan'},
  {value: 'MN', state: 'Minnesota'},
  {value: 'MO', state: 'Missouri'},
  {value: 'MS', state: 'Mississippi'},
  {value: 'MT', state: 'Montana'},
  {value: 'NC', state: 'North Carolina'},
  {value: 'ND', state: 'North Dakota'},
  {value: 'NE', state: 'Nebraska'},
  {value: 'NH', state: 'New Hampshire'},
  {value: 'NJ', state: 'New Jersey'},
  {value: 'NM', state: 'New Mexico'},
  {value: 'NV', state: 'Nevada'},
  {value: 'NY', state: 'New York'},
  {value: 'OH', state: 'Ohio'},
  {value: 'OK', state: 'Oklahoma'},
  {value: 'OR', state: 'Oregon'},
  {value: 'PA', state: 'Pennsylvania'},
  {value: 'RI', state: 'Rhode Island'},
  {value: 'SC', state: 'South Carolina'},
  {value: 'SD', state: 'South Dakota'},
  {value: 'TN', state: 'Tennessee'},
  {value: 'TX', state: 'Texas'},
  {value: 'UT', state: 'Utah'},
  {value: 'VA', state: 'Virginia'},
  {value: 'VT', state: 'Vermont'},
  {value: 'WA', state: 'Washington'},
  {value: 'WI', state: 'Wisconsin'},
  {value: 'WV', state: 'West Virginia'},
  {value: 'WY', state: 'Wyoming'}
];

class StatePicker extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Animated.timing(this.props.offSet, {
       duration: 300,
       toValue: 50
     }).start();
  }

  closeModal() {
    Animated.timing(this.props.offSet, {
       duration: 300,
       toValue: deviceHeight
    }).start(this.props.closeModal);
  }

  /* REMOVED 'choose' TOUCHABLE HIGHLIGHT
  <View style={styles.closeButtonContainer}>
    <TouchableHighlight
      onPress={this.closeModal.bind(this)}
      underlayColor='transparent'
      style={styles.closeButton}>
      <Text style={styles.closeButtonText}>
        Choose
      </Text>
    </TouchableHighlight>
  </View>
  */

  render() {
    return (
      <Animated.View style={[{ transform: [{translateY: this.props.offSet}] }, styles.pickerPosition]}>
        <PickerIOS
          selectedValue={this.props.earlyArrivalIndex}
          onValueChange={(index) => this.props.changeEarlyArrival(index)}>
          {Object.keys(earlyArrivalTimes).map((time) => (
            <PickerItemIOS
              key={time}
              value={time}
              label={earlyArrivalTimes[time].time}/>
          ))}
        </PickerIOS>
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  pickerPosition: {
    width: deviceWidth,
    position: 'absolute',
    top: deviceHeight*.025,
    height: deviceHeight*.375,
    left: -(deviceWidth*.025),
    backgroundColor: '#D8D8D8',
  },
  closeButtonContainer: {
    borderTopWidth: 1,
    borderBottomWidth:1,
    flexDirection: 'row',
    borderTopColor: '#e2e2e2',
    justifyContent: 'flex-end',
    borderBottomColor: '#e2e2e2',
  },
  closeButton: {
    paddingTop:10,
   paddingRight:10,
    paddingBottom:10
  },
  closeButtonText: {
   color: '#027afe'
  },
});

export default StatePicker;
