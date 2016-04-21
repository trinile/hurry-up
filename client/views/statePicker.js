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

const PickerItem2IOS     = PickerIOS.Item;
const deviceWidth       = Dimensions.get('window').width;
const deviceHeight      = Dimensions.get('window').height;
const stateNames = [
  {value: 'AK', stateName: 'Alaska'},
  {value: 'AL', stateName: 'Alabama'},
  {value: 'AR', stateName: 'Arkansas'},
  {value: 'AZ', stateName: 'Arizona'},
  {value: 'CA', stateName: 'California'},
  {value: 'CO', stateName: 'Colorado'},
  {value: 'CT', stateName: 'Connecticut'},
  {value: 'DC', stateName: 'District of Columbia'},
  {value: 'DE', stateName: 'Delaware'},
  {value: 'FL', stateName: 'Florida'},
  {value: 'GA', stateName: 'Georgia'},
  {value: 'HI', stateName: 'Hawaii'},
  {value: 'IA', stateName: 'Iowa'},
  {value: 'ID', stateName: 'Idaho'},
  {value: 'IL', stateName: 'Illinois'},
  {value: 'IN', stateName: 'Indiana'},
  {value: 'KS', stateName: 'Kansas'},
  {value: 'KY', stateName: 'Kentucky'},
  {value: 'LA', stateName: 'Louisiana'},
  {value: 'MA', stateName: 'Massachusetts'},
  {value: 'MD', stateName: 'Maryland'},
  {value: 'ME', stateName: 'Maine'},
  {value: 'MI', stateName: 'Michigan'},
  {value: 'MN', stateName: 'Minnesota'},
  {value: 'MO', stateName: 'Missouri'},
  {value: 'MS', stateName: 'Mississippi'},
  {value: 'MT', stateName: 'Montana'},
  {value: 'NC', stateName: 'North Carolina'},
  {value: 'ND', stateName: 'North Dakota'},
  {value: 'NE', stateName: 'Nebraska'},
  {value: 'NH', stateName: 'New Hampshire'},
  {value: 'NJ', stateName: 'New Jersey'},
  {value: 'NM', stateName: 'New Mexico'},
  {value: 'NV', stateName: 'Nevada'},
  {value: 'NY', stateName: 'New York'},
  {value: 'OH', stateName: 'Ohio'},
  {value: 'OK', stateName: 'Oklahoma'},
  {value: 'OR', stateName: 'Oregon'},
  {value: 'PA', stateName: 'Pennsylvania'},
  {value: 'RI', stateName: 'Rhode Island'},
  {value: 'SC', stateName: 'South Carolina'},
  {value: 'SD', stateName: 'South Dakota'},
  {value: 'TN', stateName: 'Tennessee'},
  {value: 'TX', stateName: 'Texas'},
  {value: 'UT', stateName: 'Utah'},
  {value: 'VA', stateName: 'Virginia'},
  {value: 'VT', stateName: 'Vermont'},
  {value: 'WA', stateName: 'Washington'},
  {value: 'WI', stateName: 'Wisconsin'},
  {value: 'WV', stateName: 'West Virginia'},
  {value: 'WY', stateName: 'Wyoming'}
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
          selectedValue={this.props.stateNameIndex}
          onValueChange={(index) => this.props.changeStateAbbreviation(index)}>
          {Object.keys(stateNames).map((value) => (
            <PickerItem2IOS
              key={value}
              value={value}
              label={stateNames[value].stateName}/>
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
