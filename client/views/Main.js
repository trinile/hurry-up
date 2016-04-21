
import React, {
  Text,
  View,
  Image,
  Component,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Login from './signin';
import AllEvents from './all-events';
import CreateEvent from './create-event';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


class Main extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <View style={styles.parent}>
        <Image
          style={styles.bg}
          source={require('../background.png')}/>
        <Text style={styles.welcome}>
          hurryup
        </Text>
        {this.props.loggedIn
          ? (<AllEvents userId={this.props.userId} tabLabel='My Events' />)
          : (<Login loggedIn={this.props.loggedIn} handlePress ={this.props.handleSignIn.bind(this)} tabLabel=''/>)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  bg: {
    top: 0,
    left: 0,
    width: deviceWidth,
    position: 'absolute',
    height: deviceHeight,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 25,
    marginTop: 20,
    color: '#F5F5F6',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
  },
});

export default Main;
