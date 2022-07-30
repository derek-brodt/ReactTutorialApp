import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {
    render() {
      // We can't modify the parent's state so we have
      // to pass in a function from parent (Board) to child (Square)
      // to call onClick()
      return (
        <button 
        className="square" 
        onClick={() =>
            // The function passed in as a prop from Board.renderSquare(i)
            this.props.onClick()
        }>
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    // Specifies what happens upon construction of the class
    constructor(props){
      // All JavaScript classes need to call super when defining the constructor
      // react component classes must state with super(props)

      // React automatically detects constructors that are useless (only inits state that is already there)
      super(props);
      this.state = {
        squares:Array(9).fill(null),
      };
    }

    handleClick(i) {
      // Const is the array structure, not the values within it
      const const_squares = this.state.squares.slice();
      // Change the constant's values
      const_squares[i] = "X";
      // Changes the squares state to the updated values of the squares
      this.setState({squares: const_squares})
    }

    renderSquare(i) {
      return (
        <Square 
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
         />
      );
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  