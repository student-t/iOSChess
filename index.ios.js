'use strict';
var React = require('react-native');
var {
  AppRegistry,
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  Linking,
  View,
} = React;


import Game from './App/Components/chess/game'
import Board from './App/Components/board.ios'
import CONSTANTS from './App/Components/constants.ios'

var game;

var iosChess = React.createClass({
  getInitialState() {
    return {
      loadApp: true,
      turn: CONSTANTS.WHITE,
      game: new Game(),
      gameOver: false
    };
  },

  newGame() {
    this.setState({turn: CONSTANTS.WHITE, game: new Game(), gameOver: false})
  },

  startFirstGame() {
    this.setState({loadApp: false})
  },

  openGitHub() {
    Linking.openURL("https://github.com/stevendikowitz/iOSChess")
  },

  openPortfolio() {
    Linking.openURL("http://stevendikowitz.com")
  },

  render() {
    if (this.state.loadApp) {
      return (
        <View ref='this' style={styles.container}>
          <Image source={require('chess.png')} style={styles.image} />
          <Text style={styles.logoText}>iOSChess</Text>
          <Text style={styles.startFirstGame} onPress={this.startFirstGame}>
            Play Chess
          </Text>
          <Text style={styles.gitHub} onPress={this.openGitHub}>
            GitHub Repo
          </Text>
          <Text style={styles.portfolio} onPress={this.openPortfolio}>
            stevendikowitz.com
          </Text>
        </View>
      )
    }

    let turn = this.state.turn,
        player = (turn === CONSTANTS.WHITE) ? "Black" : "White",
        playAgain = (
          <Text style={styles.gameOver} onPress={this.newGame}>
            Reset Game
          </Text>
        ),
        history = this.state.game.history,
        log

    let headerText = (
      <Text style={styles.turn}>
        { turn === CONSTANTS.WHITE ? "White's turn" : "Black's turn" }
      </Text>
    )

    if (history.length > 0) {

      let fromPos = history[history.length - 1],
          toPos = history[history.length - 2]
      log = (
        <Text style={styles.log}>
          {player} moved from {fromPos} to {toPos}
        </Text>
      )
    }

    if (this.state.gameOver) {
      headerText = (
        <Text style={styles.turn} >
          Game Over, {player} wins!
        </Text>
      )

      playAgain = (
        <Text style={styles.gameOver} onPress={this.newGame}>
          Play Again
        </Text>
      )
    }

    return (
        <View ref='this' style={styles.container}>
          {headerText}
          <Board turn={this.state.turn} turnComplete={this.turnComplete} game={this.state.game}/>
          {log}
          {playAgain}
        </View>
    )
  },

  turnComplete() {
    let gameOver = this.state.game.isOver()
    this.setState({ turn: this.state.turn === CONSTANTS.WHITE ? CONSTANTS.BLACK : CONSTANTS.WHITE, gameOver: gameOver })
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },

  turn: {
    fontSize: 30,
    position: 'absolute',
    width: 375,
    textAlign: 'center',
    top: 100,
    marginLeft: 25
  },

  image: {
    position: 'absolute',
    top: 320,
    marginLeft: 50,
    alignSelf: "center",
    opacity: 0.75
  },

  logoText: {
    fontSize: 40,
    position: 'absolute',
    width: 375,
    textAlign: 'center',
    marginLeft: 25,
    fontWeight: "600",
    top: 200
  },

  log: {
    fontSize: 18,
    position: 'absolute',
    width: 375,
    textAlign: 'center',
    bottom: 140,
    marginLeft: 25
  },

  gitHub: {
    fontSize: 18,
    position: 'absolute',
    width: 375,
    textAlign: 'center',
    bottom: 140,
    marginLeft: 25,
    backgroundColor: '#f2f2f2'
  },

  portfolio: {
    fontSize: 18,
    position: 'absolute',
    width: 375,
    textAlign: 'center',
    bottom: 120,
    marginLeft: 25,
    backgroundColor: '#f2f2f2'
  },

  gameOver: {
    fontSize: 20,
    position: 'absolute',
    width: 375,
    textAlign: 'center',
    bottom: 80,
    backgroundColor: "#cfd7db",
    borderRadius: 3,
    marginLeft: 20,
    padding: 10,
    width: 375,
    fontWeight: "600"
  },

  newGame: {
    fontSize: 30,
    position: 'absolute',
    width: 375,
    textAlign: 'center',
    top: 120,
    backgroundColor: "#c3c3c3",
    borderRadius: 3
  },

  startFirstGame: {
    fontSize: 30,
    position: 'absolute',
    width: 375,
    textAlign: 'center',
    top: 260,
    backgroundColor: "#c3c3c3",
    borderRadius: 3,
    marginLeft: 20
  },

  history: {
    marginTop: 20,
    fontSize: 20,
    position: 'absolute',
    textAlign: 'center',
    width: 375,
    top: 550
  }
})

AppRegistry.registerComponent('iosChess', () => iosChess)
