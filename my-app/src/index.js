import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// The Squares are "controlled components", the board has full control over them
function Square(props) {
      // We can't modify the parent's state so we have
      // to pass in a function from parent (Board) to child (Square)
      // to call onClick()
      return (
        <button className="square" onClick={() =>
            // The function passed in as a prop from Board.renderSquare(i)
            props.onClick()
        }>
          {props.value}
        </button>
      );
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
        xIsNext: true,
      };
    }

    handleClick(i) {
      // Const is the array structure, not the values within it
      // We maintain immutability because:
      // 1. Complex features such as a history of moves becomes easier to implement
      // 2. Detecting changesi n mutable objects is difficult since they are modified directly.
      //    This requires the mutable object to be compared to previous copies of itself
      //    and the entire object tree must be traversed. Immutable objects are easier;
      //    to detect immutable changes, check if the object referenced is different than the previous one
      // 3. Detecting changes determines when components must be re-rendered https://reactjs.org/docs/optimizing-performance.html#examples
      const const_squares = this.state.squares.slice();
      if (calculateWinner(const_squares) || const_squares[i]) {
        return;
      }
      // Change the constant's values
      const_squares[i] = this.state.xIsNext ? "X" : "O";
      // Changes the squares state to the updated values of the squares
      // States must be set by this.setState
      this.setState({
        squares: const_squares,
        xIsNext: !this.state.xIsNext
      })
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
      const winner = calculateWinner(this.state.squares);
      let status;
      // If winner is X or O, it returns True; if null, evaluates to false
      if (winner) {
        status = "Winner " + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
      }
      
  
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
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}  
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  