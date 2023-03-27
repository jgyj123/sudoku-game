import "./sudoku.css";
import React, { Component } from "react";

//pre loaded puzzles stored with their respective solutions
const puzzlesEasy = [
  [
    ".......43...3.9.......7......35..9.79.26.8....457...6.4...8....8.79....4.....42..",
    "219865743764329581538471629683542917972618435145793862451287396827936154396154278",
  ],
  [
    "8.1.3...29.........35.......6.8......1..53.2.....1.9.8..4..521.5.2..9.......6...9",
    "841736592926548371735291684369827145418953726257614938694385217582179463173462859",
  ],
  [
    ".73.564.8.48....519.64....7....3.......168.....7..98.3.3..1...............1.74..5",
    "173256498248397651956481237584732916392168574617549823439615782765823149821974365",
  ],
  [
    ".41..............9..2..376..63.....449...1.868.....3......6..3.......8.1.1..4..97",
    "741986523386527149952413768163852974495731286827694315579168432634279851218345697",
  ],
  [
    "7..9....8....813..3...7....8..4...2...9..8.....23..4...7.....95..1.5...22.31...7.",
    "726943518495281367318576249837415926149628753562397481674832195981754632253169874",
  ],
  [
    "286.3.........7.4...4.8.....5.6.......29..5..6....8.......6.7549.3..4.8..6.....39",
    "286435971531297846794186325357621498812943567649758213128369754973514682465872139",
  ],
];
const puzzlesMedium = [
  [
    ".....7..21..263.....6.........3........6....37....9.5.5.....1...9..563..2..934..6",
    "359417862178263495426598731642375918985641273731829654563782149894156327217934586",
  ],
  [
    "..7...5.68.56..........48....459..............2.743...64982..5...3.....8..2.7..9.",
    "497238516835617249261954873314596782976182435528743961649821357753469128182375694",
  ],
  [
    "..........6..4.8.11......456....837..879.......3..16..316....8.......5...98.....6",
    "824135967765249831139687245651428379287963154943751628316594782472816593598372416",
  ],
  [
    "......2493....1........9.8.1.43.5...........4..9.6..58.8..13...6.......1..5...6..",
    "851736249392841576746529183174385962568972314239164758987613425623457891415298637",
  ],
  [
    ".5.9...2.........17.1.326.4.4..5.9....32...5.2..16.4.......1.....47..1..3........",
    "456918327932476581781532694648357912193284756275169438569841273824793165317625849",
  ],
];
const puzzlesHard = [
  [
    ".1.752..4.76.3...5.8.4....3..258..7......7.5.....2.34.1...642....3...............",
    "319752864476138925285496713642583179831947652597621348158364297963275481724819536",
  ],
  [
    "76.5..1..9.2..7.653..2....9......8.......8..1.2.....56..3.56..2...9...7...51.....",
    "764593128912487365358261749149625837536748291827319456473856912681932574295174683",
  ],
  [
    "69..7...5.54.38...2.....7499....35.7......36..3.752.9....4.9.........6....5......",
    "691274835754938126283516749912643587547891362836752491178469253329185674465327918",
  ],
  [
    "....3..4.9...1..8.76..9..3.471......35.78......6...........8..3....7496..945.....",
    "512836749943217586768495231471652398359781624286349175127968453835174962694523817",
  ],
  [
    "9.2..6....1.78..5..4..2...7..61..284..92..1.6.8....5.....69.......8...........4..",
    "972536841613784952548921367736159284459278136281463579324695718195847623867312495",
  ],
];

class Sudoku extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      solution: "",
      isLoaded: false,
      gameWon: false,
      gameRunning: true,
      seconds: 0,
    };
    this.clearBoard = this.clearBoard.bind(this);
    this.checkSolution = this.checkSolution.bind(this);
    this.printBoard = this.printBoard.bind(this);
    this.getHint = this.getHint.bind(this);
    this.clear = this.clear.bind(this);
  }
  //generates puzzle and starts timer when component is loaded
  componentDidMount() {
    this.setState({ isLoaded: true });
    this.printBoard();
    this.toggleTimer();
  }
  //stops state from updating when component is unmounted
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
  //clear moves while puzzle still remains loaded
  clear = () => {
    for (let i = 1; i < 82; i++) {
      if (document.getElementById(i.toString()).disabled === false) {
        document.getElementById(i.toString()).value = null;
      }
    }
  };
  //completely clears the board
  clearBoard = () => {
    this.setState({
      gameWon: false,
      gameRunning: true,
      seconds: 0,
    });
    for (let i = 1; i < 82; i++) {
      document.getElementById(i.toString()).value = null;
      document.getElementById(i.toString()).classList.remove("given");
      document.getElementById(i.toString()).disabled = false;
    }
  };

  //prints the puzzle and updates the current solution state based on difficulty level selected
  printBoard = () => {
    this.clearBoard();
    let difficulty = this.props.difficulty;
    if (difficulty === "easy") {
      let randomNumber = Math.floor(Math.random() * puzzlesEasy.length);
      this.setState({
        solution: puzzlesEasy[randomNumber][1],
      });
      for (let i = 1; i < 82; i++) {
        if (
          puzzlesEasy[randomNumber][0][i - 1] !== "0" &&
          puzzlesEasy[randomNumber][0][i - 1] !== "."
        ) {
          document.getElementById(i.toString()).value = parseInt(
            puzzlesEasy[randomNumber][0][i - 1]
          );
          document.getElementById(i.toString()).disabled = true;
          document.getElementById(i.toString()).classList.add("given");
        }
      }
    } else if (difficulty === "medium") {
      let randomNumber = Math.floor(Math.random() * puzzlesMedium.length);
      this.setState({
        solution: puzzlesMedium[randomNumber][1],
      });
      for (let i = 1; i < 82; i++) {
        if (
          puzzlesMedium[randomNumber][0][i - 1] !== "0" &&
          puzzlesMedium[randomNumber][0][i - 1] !== "."
        ) {
          document.getElementById(i.toString()).value = parseInt(
            puzzlesMedium[randomNumber][0][i - 1]
          );
          document.getElementById(i.toString()).disabled = true;
          document.getElementById(i.toString()).classList.add("given");
        }
      }
    }
    if (difficulty === "hard") {
      let randomNumber = Math.floor(Math.random() * puzzlesHard.length);
      this.setState({
        solution: puzzlesHard[randomNumber][1],
      });
      for (let i = 1; i < 82; i++) {
        if (
          puzzlesHard[randomNumber][0][i - 1] !== "0" &&
          puzzlesHard[randomNumber][0][i - 1] !== "."
        ) {
          document.getElementById(i.toString()).value = parseInt(
            puzzlesHard[randomNumber][0][i - 1]
          );
          document.getElementById(i.toString()).disabled = true;
          document.getElementById(i.toString()).classList.add("given");
        }
      }
    }
  };
  //checks the answer
  checkSolution() {
    let solution = "";
    for (let i = 1; i < 82; i++) {
      solution += document.getElementById(i.toString()).value.toString();
    }
    if (solution === this.state.solution) {
      this.setState({
        gameWon: true,
        gameRunning: false,
      });
    } else {
      alert("Try Again!");
    }
  }
  //revals a hint
  getHint() {
    for (let i = 0; i < 81; i++) {
      if (
        this.state.solution[i] !==
        document.getElementById((i + 1).toString()).value.toString()
      ) {
        document.getElementById((i + 1).toString()).value =
          this.state.solution[i];
        break;
      }
    }
  }
  // converts seconds to time
  setSession = (time) => {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    return (
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
  };
  //increments timer every second
  toggleTimer = () => {
    if (this.state.gameRunning) {
      this.myInterval = setInterval(this.updateSeconds, 1000);
    }
  };
  //increases second count by one
  updateSeconds = () => {
    if (this.state.gameRunning) {
      var seconds = this.state.seconds;
      this.setState({
        seconds: seconds + 1,
      });
    }
  };
  render() {
    return (
      <div className="main">
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
        </div>
        <button onClick={this.printBoard} className="btn btn-primary btn-sm">
          New Game
        </button>

        <button onClick={this.clear} className="btn btn-secondary btn-sm">
          Clear
        </button>
        <button onClick={this.checkSolution} className="btn btn-success btn-sm">
          Check
        </button>
        <button
          className="btn btn-sm btn-primary"
          id="hint"
          onClick={this.getHint}
          data-toggle="tooltip"
          data-placement="top"
          title="Get a Hint"
        >
          <img src="light-bulb.png" className="img" alt="hint button"></img>
        </button>
        <div className="timer">{this.setSession(this.state.seconds)}</div>
        {this.state.gameWon ? (
          <div className="checkWin">
            <br />
            <h2>You Won!</h2>
            <h4>Click on 'New Game' to play another game</h4>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}

export default Sudoku;
