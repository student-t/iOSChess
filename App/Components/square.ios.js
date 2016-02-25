import React, {
  AppRegistry,
  Component,
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native';

const Square = React.createClass({
  render() {
    const color = this.props.column % 2 === 1 ?
      (this.props.row % 2 === 1 ? '#cfd7db' : '#8ca2ac') :
      (this.props.row % 2 === 1 ? '#8ca2ac' : '#cfd7db')

    const styles = {
      backgroundColor: this.props.selected ? '#376060' : color,
      width: 375/8,
      height: 375/8
    }

    const onPress = () => {
      this.props.onSquareSelect(this.props.row, this.props.column);
    }

    if (this.props.selectable) {
      return (
        <TouchableHighlight style={styles} onPress={onPress}>
          <View>
          </View>
        </TouchableHighlight>
      )
    } else {
      return (
        <View style={styles}>
        </View>
      )
    }
  }
});

module.exports = Square;
