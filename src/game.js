import React, { Component } from "react";
import "./game.css";
import Sudoku from "./sudoku.js";
class Game extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      level: "easy",
      settingsConfigured: false,
    };
  }

  handleClick(difficulty) {
    console.log(difficulty);
    this.setState({ settingsConfigured: true, level: difficulty });
  }
  render() {
    if (this.state.settingsConfigured === false) {
      return (
        <div className="main">
          <h1 className="settings-text">Please select your difficulty</h1>
          <div className="settings">
            <button
              className="level-button"
              id="button1"
              value="easy"
              onClick={(e) => this.handleClick(e.target.value)}
            >
              Easy
            </button>
            <button
              className="level-button"
              id="button2"
              value="medium"
              onClick={(e) => this.handleClick(e.target.value)}
            >
              Medium
            </button>
            <button
              className="level-button"
              id="button3"
              value="hard"
              onClick={(e) => this.handleClick(e.target.value)}
            >
              Hard
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="sudoku">
          <h1 className="difficulty">Difficulty: {this.state.level} </h1>
          <Sudoku difficulty={this.state.level} />
        </div>
      );
    }
  }
}

export default Game;
