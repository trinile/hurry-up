import React, { 
  Component,
  ListView 
} from 'react-native';

import Button from 'react-native-button';

var styles = require('../styles/styles');

var _navigate;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })
    };
    _navigate = this.props.navigate;
  }
  
  _onItemSelect(item) {
    _navigate(item);
  }
  
  _renderMenuItem(item) {
    return (
      <Button onPress={()=> this._onItemSelect(item)}>{item}</Button>
    );
  }

  
  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(['Home', 'AnotherComponent'])
    });
  }
  
  render() {
    return (
        <ListView
          style={styles.controlPanel}
          dataSource={this.state.dataSource}
          renderRow={(item) => this._renderMenuItem(item)}
        />
    );
  }
  
}

export default Menu;
