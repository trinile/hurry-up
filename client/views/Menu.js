import React, { 
  Component,
  ListView 
} from 'react-native';

import Button from 'react-native-button';

var styles = require('../styles/styles');


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })
    };
  }
  
  _onItemSelect(item) {
      // Add the code to push a scene in navigation stack, we’ll do it in a few
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
