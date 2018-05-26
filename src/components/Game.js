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
      currGridSize: 3,
      newGridSize: null,
      checkBoxes : {
        3:true,
        4:false,
        5:false,
      },
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
      console.log("Oops, Position " + i + " is filled.");
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

  // set the gridSize property in the state
  setGridSize(newSize) {
    var newCheckBoxs = {
      3:false,
      4:false,
      5:false,
    };
    newCheckBoxs[newSize] = true;
    this.setState({
      newGridSize: newSize,
      checkBoxes: newCheckBoxs,
    })
  }

  // render the game with a new gridsize
  renderNewSize() {
    // return if no newGridsize is selected
    if (this.state.newGridSize === null) {
      return;
    }
    // first we clean the current game
    this.restart();
    var currSize = this.state.newGridSize;
    var newArray = [Array(Math.pow(currSize, 2)).fill(null)];
    this.setState({
      history: newArray,
      currGridSize: currSize,
      newGridSize: null,
    })
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
      history: [Array(9).fill(null)],
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
    const gamestatus = checkGameOver(
      squares, 
      this.state.lastMove[this.state.lastMove.length-1],
      this.state.currGridSize
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
      if (state === 0) {
        return null;
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
        {/*print the title*/}
        <div className="title">Tic Tac Toe</div>
        
        {/*render the game*/}
        <div className="game-board">
          <Board 
            squares={squares}
            onClick={(i) => this.handleClick(i)}
            extraRender={winningRow}
            currGridSize={this.state.currGridSize}
          />
        </div>

        {/*checkbox selection for gridSize*/}
        <div className="checkbox-list">
          <div>Change the Gridsize</div>
          <label className="checkBox">
            <input type="radio" className="checkbox-control" checked={this.state.checkBoxes[3]} onChange={() => this.setGridSize(3)}/>
            <span className="checkbox-label"> 3 * 3</span>
          </label>

          <label className="checkBox">
            <input type="radio" className="checkbox-control" checked={this.state.checkBoxes[4]} onChange={() => this.setGridSize(4)}/>
            <span className="checkbox-label"> 4 * 4</span>
          </label>

          <label className="checkBox">
            <input type="radio" className="checkbox-control" checked={this.state.checkBoxes[5]} onChange={() => this.setGridSize(5)}/>
            <span className="checkbox-label"> 5 * 5</span>
          </label>
          <button className="sizeButton" onClick={() => this.renderNewSize()}>Select</button>
        </div>

        {/*print the game status*/}
        <div className="game-status">{gameStatus}
        {/*render the start button*/}
        <div className="restart"><button className = "restartButton" onClick={() => this.restart()}>RESTART</button></div>
        </div>
        
        {/*print the game history*/}
        <div className="game-info">  
          <div>{playerStatus}</div>
          <div><ol>{prevMoves}</ol></div>
        </div>
      </div>
    );
  }
}


export default Game