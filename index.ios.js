'use strict';
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;


import Game from './App/Components/chess/game'
import Board from './App/Components/board.ios'
import CONSTANTS from './App/Components/constants.ios'

var game;

var iosChess = React.createClass({
  getInitialState() {
    return {
      turn: CONSTANTS.WHITE, game: new Game(), gameOver: false
    };
  },

  render() {
    let turn = this.state.turn,
        player = (turn === CONSTANTS.WHITE) ? "Black" : "White"

    let headerText = (
      <Text style={styles.turn}>
        { turn === CONSTANTS.WHITE ? "White's turn" : "Black's turn" }
      </Text>
    )

    if (this.state.gameOver) {
      headerText = (
        <Text style={styles.turn}>
          Game Over!
        </Text>
      )
    }

    return (
      <View ref='this' style={styles.container}>
        {headerText}

        <Board turn={this.state.turn} turnComplete={this.turnComplete} game={this.state.game}/>


      </View>
    );
  },

  turnComplete() {
    let gameOver = this.state.game.isOver()

    this.setState({ turn: this.state.turn === CONSTANTS.WHITE ? CONSTANTS.BLACK : CONSTANTS.WHITE, gameOver: gameOver })
  },

  componentWillMount() {
    // this.setState({game: new Game()})
  },

  componentDidMount() {
    // this.forceUpdate()
    // setTimeout(() => {
    //   Animation.startAnimation({node:this.refs['this'], duration: 300, delay: 0, easing: 'easeInOutQuad', properties: {opacity: 1}});
    // }, 0);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  turn: {
    fontSize: 30,
    position: 'absolute',
    width: 375,
    textAlign: 'center',
    top: 50
  },

  gameOver: {
    fontSize: 30,
    position: 'absolute',
    width: 375,
    textAlign: 'center',
    top: 80
  },

  history: {
    marginTop: 20,
    fontSize: 20,
    position: 'absolute',
    textAlign: 'center',
    width: 375,
    top: 550
  }
});

AppRegistry.registerComponent('iosChess', () => iosChess);

// <Text style={styles.history}>
//   {history.length > 0 ?
//     `${player} moved ${history[history.length - 1].to} to ${history[history.length - 1].from}` : ''}
// </Text>
