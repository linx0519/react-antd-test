import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button } from "antd/lib/radio";

function Square(props) {
  return (
    <div className="btn-container">
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
      <span className="xy">
        {`${props.xy.x},${props.xy.y}`}
      </span>
    </div>
  );
}

class Board extends React.Component {
  renderSquare(i, xy) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        xy={xy}
        onClick={() => this.props.onClick(i, xy)}>
      </Square>
    );
  }

  renderBoard() {
    let count = 0;
    let squareArray = [];
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        let square = this.renderSquare(count, { x: i, y: j });
        squareArray.push(square);
        count++;
      }
    }
    return squareArray;
  }

  render() {
    return (
      <div className="border">
        {this.renderBoard()}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null), xy: null },
      ],
      stepNumber: 0,
      isNextX: true,
      activeStep: ""
    };
  }

  handleClick(i, xy) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isNextX ? "X" : "O";
    this.setState({
      history: history.concat([{
        squares: squares,
        xy: xy
      }]),
      isNextX: !this.state.isNextX,
      stepNumber: history.length
    });
  }

  handleRestart(winner) {
    this.setState({
      squares: Array(9).fill(null),
      isNextX: !(winner === "X")
    });
  }

  jumpTo(move) {
    this.setState({
      stepNumber: move,
      isNextX: (move % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move}` :
        "Go to game start";
      let str = JSON.stringify(step.xy);
      return (
        <li key={move} className={{ "active": str === this.state.activeStep }}>
          <Button onClick={() => this.jumpTo(move)}>{`${desc}`}</Button>
          <span>{`${step.xy && step.xy.x + "," || ""}${step.xy && step.xy.y || ""}`}</span>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner is ${winner}`;
    } else {
      status = `Next player ${this.state.isNextX ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i, xy) => this.handleClick(i, xy)}>
          </Board>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

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
