import React from 'react';
import '../index.css';
import Board from './Board';
import {checkGameOver} from '../utils';

// core class controlling the logic of the tic tac toe game.
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [Array(9).fill(null)], //list of matrixs represents the game history
      stepNumber: 0,
      xIsNext: true,
      lastMove: [],
    };
  }

  // handles a click on the block
  handleClick(i) {
    //change the square state
    const newHistory = this.state.history;
    const currSquares = newHistory[newHistory.length - 1].slice();
    const nextStepNum = this.state.stepNumber + 1;
    var newLastMove = this.state.lastMove;

    // check if the position is occupied
    if (currSquares[i]!==null) {
      return;
    }
    currSquares[i] = this.state.xIsNext ? 'X' : 'O';
    newHistory.push(currSquares);
    newLastMove.push(i);
    this.setState({
      history : newHistory,
      xIsNext : !this.state.xIsNext,
      stepNumber : nextStepNum,
      lastMove : newLastMove,
    });
  }

  // jump the game back to a prevous state
  jumpTo(step) {
    // slice the history
    var newHistory = this.state.history;
    newHistory = newHistory.slice(0, step+1);
    var newLastMove = this.state.lastMove;
    newLastMove = newLastMove.slice(0, step);
    this.setState({
      history: newHistory,
      stepNumber: step,
      xIsNext: (step%2) === 0,
      lastMove: newLastMove,
    })
  }

  // restart the entire game, clean the history
  restart() {
    this.setState({
      history: [[Array(9).fill(null)]],
      stepNumber: 0,
      xIsNext: true,
      lastMove: [],
    })
  }

  // render the entire game
  render() {
    const history = this.state.history;
    const squares = history[history.length - 1];
    
    // gamestatus is a hash
    const gamestatus = checkGameOver(squares, 
      this.state.lastMove[this.state.lastMove.length-1]
    );

    const game = gamestatus["gameFlag"];
    let gameStatus;
    let playerStatus;
    let winningRow;
    if (game) {
      gameStatus = 'Game Over';
      playerStatus = 'Player ' + (this.state.xIsNext ? 'O':'X') + ' wins the game !';
      winningRow = gamestatus["row"];
    } else {
      gameStatus = 'Game in the process...';
      playerStatus = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // create the history moves list
    const prevMoves = history.map((step,state) => {
      if (state ==0) {
        return;
      }
      const currLabel = 'Go to move #' + state;
      return (
        <li>
          <button className = "historyButton" onClick={() =>this.jumpTo(state)}>{currLabel}</button>
        </li>
      );
    });

    // return the entire page
    return (
      <div className="game" >
        <div className="title">Tic Tac Toe</div>
        
        <div className="game-board">
          <Board 
            squares={squares}
            onClick={(i) => this.handleClick(i)}
            extraRender={winningRow}
          />
        </div>
        <div className="game-status">{gameStatus}
        <div className="restart"><button className = "restartButton" onClick={() => this.restart()}>RESTART</button></div>
        </div>
          
        <div className="game-info">
          
          <div>{playerStatus}</div>
          <div><ol>{prevMoves}</ol></div>
        </div>
      </div>
    );
  }
}


export default Game