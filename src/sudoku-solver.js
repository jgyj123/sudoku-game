import "./sudoku-solver.css";

import React, { Component } from "react";

class Solver extends Component {
  state = {
    boardValue: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  };
  findSolution = () => {
    //gets an array of the entered numbers and passes it to a solver function
    let converted = this.state.boardValue;
    for (let i = 0; i < 9; i++) {
      for (let j = 1; j < 10; j++) {
        if (document.getElementById((i * 9 + j).toString()).value) {
          converted[i][j - 1] = parseInt(
            document.getElementById((i * 9 + j).toString()).value
          );
        } else {
          converted[i][j - 1] = 0;
        }
      }
    }
    this.solveSudoku(converted);
  };
  //checks for valid puzzle

  //solves sudoku using backtracking
  // while sudoku puzzle is not solved,
  //find empty space and fill it with a valid guess checked by a helper function
  //pass the updated puzzle into the same function recursively until a solution is found
  //if no solution is found, backtrack and set the original guess back to 0
  solveSudoku(puzzle) {
    if (this.findEmpty(puzzle) === false) {
      this.updateBoard(puzzle);
      return true;
    } else {
      let finds = this.findEmpty(puzzle);
      for (let i = 1; i < 10; i++) {
        if (this.checkValidGuess(puzzle, finds[0], finds[1], i)) {
          puzzle[finds[0]][finds[1]] = i;
          if (this.solveSudoku(puzzle)) {
            return true;
          }
          //if no solution found, set it back to 0
          puzzle[finds[0]][finds[1]] = 0;
        }
      }
      return false;
    }
  }
  findEmpty(puzzle) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (puzzle[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return false;
  }
  checkValidGuess(puzzle, row, col, guess) {
    for (let i = 0; i < 9; i++) {
      if (puzzle[row][i] === guess || puzzle[i][col] === guess) {
        return false;
      }
    }
    //checks for the same number in the 3x3 grid
    //indexes go from 0-8 ,therefore values of startRow and start Column are 0,1 or 2 and we multiply that by 3 to get the index
    let startRow = Math.floor(row / 3) * 3;
    let startColumn = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startColumn; j < startColumn + 3; j++) {
        if (puzzle[i][j] === guess) {
          return false;
        }
      }
    }
    return true;
  }

  //puts numbers on screen after being solved
  updateBoard(puzzle) {
    for (let i = 0; i < 9; i++) {
      for (let j = 1; j < 10; j++) {
        setTimeout(function () {
          let color =
            "rgb(" +
            (255).toString() +
            ", " +
            (255).toString() +
            " ," +
            (255).toString() +
            ")";
          document.getElementById((i * 9 + j).toString()).value =
            puzzle[i][j - 1];
          document.getElementById(
            (i * 9 + j).toString()
          ).style.backgroundColor = color;
          document.getElementById((i * 9 + j).toString()).style.color = "black";
        }, i * 20 + j * 20);
      }
    }
  }
  clearBoard() {
    for (let i = 1; i < 82; i++) {
      document.getElementById(i.toString()).value = null;
      document.getElementById(i.toString()).style.backgroundColor = "white";
      document.getElementById(i.toString()).style.color = "black";
    }
  }
  render() {
    return (
      <div className="main">
        <br />
        <br />
        <div className="board">
          <table>
            <tr>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="1"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="2"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="3"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="4"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="5"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="6"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="7"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="8"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="9"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="10"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell "
                  id="11"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="12"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="13"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="14"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="15"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="16"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="17"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="18"
                ></input>
              </td>
            </tr>
            <tr>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell "
                  id="19"
                ></input>
              </td>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="20"
                ></input>
              </td>
              <td className="bottom right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="21"
                ></input>
              </td>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="22"
                ></input>
              </td>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="23"
                ></input>
              </td>
              <td className="bottom right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="24"
                ></input>
              </td>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="25"
                ></input>
              </td>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="26"
                ></input>
              </td>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="27"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="28"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="29"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="30"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="31"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell "
                  id="32"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="33"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="34"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="35"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="36"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="37"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="38"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="39"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="40"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="41"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="42"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="43"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="44"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="45"
                ></input>
              </td>
            </tr>
            <tr>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="46"
                ></input>
              </td>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="47"
                ></input>
              </td>
              <td className="bottom right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="48"
                ></input>
              </td>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="49"
                ></input>
              </td>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="50"
                ></input>
              </td>
              <td className="bottom right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="51"
                ></input>
              </td>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="52"
                ></input>
              </td>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="53"
                ></input>
              </td>
              <td className="bottom">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="54"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="55"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="56"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="57"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="58"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="59"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="60"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="61"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="62"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="63"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="64"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="65"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="66"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="67"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="68"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="69"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="70"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="71"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="72"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="73"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="74"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="75"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="76"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="77"
                ></input>
              </td>
              <td className="right">
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="78"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="79"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="80"
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  className="cell"
                  id="81"
                ></input>
              </td>
            </tr>
          </table>
          <button className="solve-button" onClick={this.findSolution}>
            Solve
          </button>
          <button onClick={this.clearBoard}>Clear</button>
        </div>
      </div>
    );
  }
}

export default Solver;
