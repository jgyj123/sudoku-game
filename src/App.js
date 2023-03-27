import "./App.css";
import React, { Component } from "react";
import Game from "./game.js";
import Solver from "./sudoku-solver.js";
class App extends Component {
  state = {
    mode: "homepage",
    theme: "Dark Mode",
  };
  //configures game mode
  changeHome = () => {
    this.setState({
      mode: "homepage",
    });
    this.checkTheme();
  };

  changeGame = () => {
    this.setState({
      mode: "game",
    });
  };
  changeSolve = () => {
    this.setState({
      mode: "Solve",
    });
  };
  checkTheme = () => {
    console.log(this.state.theme);
  };
  //changes themes

  updateLight = () => {
    document.getElementById("main").style.backgroundImage =
      "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)";
    document.getElementById("navigation").style.backgroundColor = "black";

    document.getElementById("main").style.color = "black";
  };

  navBar = () => {
    return (
      <div class="nav-bar" id="navigation">
        <button className="nav-button" id="nav-1" onClick={this.changeHome}>
          Home
        </button>
        <button className="nav-button" id="nav-2" onClick={this.changeGame}>
          Play
        </button>
        <button className="nav-button" id="nav-3" onClick={this.changeSolve}>
          Solver
        </button>
      </div>
    );
  };
  render() {
    if (this.state.mode === "homepage") {
      return (
        <div id="main">
          {this.navBar()}
          <br />
          <div className="text-center" id="text">
            <h1>Welcome To Sudoku!</h1>

            <p> created by Jonathan Goh</p>
            <p></p>
          </div>
        </div>
      );
    } else if (this.state.mode === "game") {
      return (
        <div id="main">
          {this.navBar()}
          <br />
          <Game />
        </div>
      );
    } else {
      return (
        <div id="main">
          {this.navBar()}

          <Solver />
        </div>
      );
    }
  }
}

export default App;
