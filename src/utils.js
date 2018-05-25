/* 
  This function checks if the game is over by verifying if the 
  lastMove caused winning the game. If the game is over, it will
  return a hash contains a winning flag and a winning row array. Otherwise 
  it will return a not-winning flag.
*/
export function checkGameOver(squares, lastMove) {
  const length = 3;
  if (lastMove == null) {
    return false;
  } else {
    var symbol = squares[lastMove];  
  }
  
  /* check if the horizontal row is filled by the same element */
  const horiStart = length*Math.floor(lastMove/length);
  var flag = true;
  var winningRow = [];
  for (let i = 0; i < length; i++) {
    if (squares[horiStart+i] !== symbol) {
      flag = false;
      break;
    }
  }
  // if true, just return the game
  if (flag) {
    // add the winning row
    for (let idx=0; idx < length; idx++) {
      winningRow.push(horiStart+idx);
    }
    return {
      gameFlag : flag,
      row : winningRow
    };
  }

  /* check if the vertical row is filled by the same element */
  const vertiStart = lastMove%length;
  flag = true;
  for (let i = 0; i < length; i++) {
    if (squares[vertiStart+i*length] !== symbol) {
      flag = false;
      break;
    }
  }
  // if true, just return the game
  if (flag) {
    // add the winning row
    for (let idx = 0; idx < length; idx++) {
      winningRow.push(vertiStart+idx*length);
    }
    return {
      gameFlag : flag,
      row : winningRow
    };
  }


  /* check if the lastMove is on diagonal line */
  var xidx = lastMove%length;
  var yidx = Math.floor(lastMove/length);
  if (xidx === yidx) {
    // top left to bottom right
    flag = true;
    for (let i=0; i<length; i++){
      if (squares[i*length+i] !== symbol) {
        flag = false;
        break;
      }
    }

    if (flag) {
      for (let idx = 0; idx < length; idx++) {
        winningRow.push(idx*length+idx);
      }
      return {
        gameFlag : flag,
        row : winningRow
      };
    }

  }

  if ((xidx+yidx) === length-1) {
    // top right to bottom left
    flag = true;
    for (let i=0; i<length; i++){
      if (squares[i*length+length-1-i] !== symbol) {
        flag = false;
        break;
      }
    }
    if (flag) {
      for (let idx = 0; idx < length; idx++) {
        winningRow.push(idx*length+length-1-idx);
      }
      return {
        gameFlag : flag,
        row : winningRow
      };
    }
  }
  return {
    gameFlag : false,
  }; 
}

