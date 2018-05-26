import React from 'react';
import '../index.css';
import Square from './Square';

class Board extends React.Component {

  // render a square
  renderSquare(i, color="white") {
    return (
    <Square 
      value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
      color = {color}
      key = {i}
    />);
  }

  // render the entire board
  render() {
    var matrix = [];
    var count = 0;
    var winningRow = this.props.extraRender;
    var gridSize = this.props.currGridSize;

    for (let idx=0; idx<gridSize; idx++){
      var row = [];
      for (let j=0; j<gridSize; j++){
        if (winningRow != null && winningRow.includes(count)) {
          row.push(this.renderSquare(count, "red"));
        } else {
          row.push(this.renderSquare(count));
        }
        count++;
      }
      matrix.push(<div key={idx}>{row}</div>);
    }
    return (
      <div>
        {matrix}
      </div>
      ); 
  }
}

export default Board