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

    

    renderSquare(i) {
      return (
        <Square 
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
         />
      );
    }
  
    render() {
      return (
        <div>
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
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        XisNext: true,
        stepNumber: 0,
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
      // Depending on the step number, make the history all of history up to the current stepNumber
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length-1];
      const const_squares = current.squares.slice();
      if (calculateWinner(const_squares) || const_squares[i]) {
        return;
      }
      // Change the constant's values
      const_squares[i] = this.state.xIsNext ? "X" : "O";
      // Changes the squares state to the updated values of the squares
      // States must be set by this.setState
      this.setState({
        // We prefer concat over push because it doesn't mutate the original array
        history: history.concat([{
          squares: const_squares,
        }]),
        // Set the stepNumber to the len of history after every click
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      })
    }

    jumpTo(step) {
      this.setState ({
        // We don't have to update
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
      const history = this.state.history;
      // History is the current step number
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
          "Go to move #" + move:
          "Go to game start";
          return (
            // React needs to have dynamic list items have a unique ID associated with it so then if
            // they change, react can know which components to keep and which to change
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          )
      })
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player " + (this.state.xIsNext ? "X" : "O");
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              onClick= {(i) => this.handleClick(i)}

            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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
  