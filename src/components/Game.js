import React from 'react';
import '../index.css';
import Board from './Board';
import {gameOver} from '../utils';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      lastMove: null,
    };
  }

  // handles a click
  handleClick(i) {
    //change the square state
    const currSquares = this.state.squares.slice();
    currSquares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares : currSquares,
      xIsNext : !this.state.xIsNext,
      lastMove : i,
    });
  }

  render() {
    const squares = this.state.squares;

    const gamestatus = gameOver(this.state.squares, this.state.lastMove);

    const game = gamestatus["gameFlag"];
    let gameStatus;
    let playerStatus;
    let winningRow;
    if (game) {
      gameStatus = 'Game Over';
      playerStatus = 'Done';
      winningRow = gamestatus["row"];
    } else {
      gameStatus = 'Game in the process...';
      playerStatus = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // return the entire page
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={squares}
            onClick={(i) => this.handleClick(i)}
            extraRender={winningRow}
          />
        </div>
        <div className="game-info">
          <div>{gameStatus}</div>
          <div>{playerStatus}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


export default Game