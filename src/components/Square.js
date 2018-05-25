import React from 'react';
import '../index.css';

// class rendering a single square
class Square extends React.Component {

  // render a single block
  render() {
  	const styles = {buttonStyle: {backgroundColor: this.props.color}};
    return (
      <button className="square" onClick={this.props.onClick} style={styles.buttonStyle}>
        {this.props.value}
      </button>
      
    );
  }
}

export default Square