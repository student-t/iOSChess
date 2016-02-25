import React, {
  AppRegistry,
  Component,
  Animation,
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native';

const Piece = React.createClass({

  onPress() {
    this.props.onPieceSelect(
      this.props.row,
      this.props.column,
      this.props.color
    )
  },

  render() {
    const containerStyle = {
      top: this.props.row * (375/8),
      left: this.props.column * (375/8)
    }

    const textStyle = {
      color: this.props.color
    }

    if (this.props.selectable) {
      return (
        <View style={[styles.container, containerStyle]} ref='this'>
          <TouchableHighlight onPress={this.onPress} >
            <Text style={[styles.text, textStyle]}>
              {this.props.piece}
            </Text>
          </TouchableHighlight>
        </View>
      )
    } else {
      return (
        <View style={[styles.container, containerStyle]} ref='this'>
          <Text style={[styles.text, textStyle]}>
            {this.props.piece}
          </Text>
        </View>
      )
    }
  },

  componentWillUpdate(nextProps, nextState) {
  },

  componentDidMount() {
    // this.forceUpdate()
  }
})

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 375/8,
    height: 375/8,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    opacity: 1
  },

  text: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

module.exports = Piece
