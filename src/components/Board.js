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
    />);
  }

  // render the board
  render() {
    var matrix = [];
    var count = 0;
    var winningRow = this.props.extraRender;
    for (let idx=0; idx<3; idx++){
      var row = [];
      for (let j=0; j<3; j++){
        if (winningRow != null && winningRow.includes(count)) {
          row.push(this.renderSquare(count, "red"));
        } else {
          row.push(this.renderSquare(count));
        }
        count++;
      }
      matrix.push(<div>{row}</div>);
    }


    return (
      <div>
        {matrix}
      </div>
      ); 
  }
}

export default Board