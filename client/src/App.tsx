
// Importing useState for setting the states of the parameters
import { useState } from "react"; 

// Axios is reesponsible for HTTP POST requests of the data to the server
// and also receiving the response of the server.
import axios from "axios";

// Import of the external stylesheet
import "./App.css";

// Type Declaration for the parameters/board states
type Tiles = ("X" | "O" | null)[];
type Next = "X" | "O";
type Winner = "X" | "O" | null;

// The function for displaying the whole board.
function Board(): JSX.Element {

  // The variable state array of tiles that is the container for the X's and O's
  const [tiles, setTiles] = useState<Tiles>(Array(9).fill(null));

  // The player state variable to which determines the player that's going to play.
  const [nextPlayer, setNextPlayer] = useState<Next>("X");

  // The state variable that says the winner.
  const [winner, setWinner] = useState<Winner>(null);

  // The game status that displays whose turn is it to play.
  const [gameStatus, setGameStatus] = useState<string>(
    `Player ${nextPlayer}'s Turn.`
  );

  // The error state variable that will be used to display the error.
  const [error, setError] = useState<any>(null);

  // The asynchronous function that is doing the request to the server and receiving the response.
  async function chooseTile(tileNumber: number): Promise<void> {
    
    // if there's already a winner or if the chosen tile has conten in it, return void so that the tile can't be overwritten.
    if (winner || tiles[tileNumber]) {
      return;
    }

    // The object to be sent as the request to the server.
    const boardState = {
      tiles: tiles,
      tileNumber: tileNumber,
      nextPlayer: nextPlayer,
      winner: winner,
      gameStatus: gameStatus,
    };

    //The axios function that does the requesting and getting the response back from the server.
    await axios
      .post("/api", boardState)
      .then((response) => {
        // if there's a response received
        setTiles(response.data.tiles);
        setNextPlayer(response.data.nextPlayer);
        setWinner(response.data.winner);
        setGameStatus(response.data.gameStatus);
      })
      .catch((error) => {
        // if there's an error getting a response
        console.log("Error receiving data:", error);
        setError(error);
      });
  }

  // The function for when the players want to restart the game.
  function restart() {
    setNextPlayer("X");
    setTiles(Array(9).fill(null));
    setWinner(null);
    setGameStatus(`Player X's Turn.`);
  }

  // The function component for changing the content of the tiles to X's or O's
  function showTile(i: number): React.ReactNode {
    return (
      <button className="tile" onClick={() => chooseTile(i)}>
        {tiles[i]}
      </button>
    );
  }

  // if there's an error received, the whole page will display this corresponding JSX Element.
  if (error) {
    return (
      <div>
        <h3>
          Error receiving data. <br /> Error: {error}
        </h3>
      </div>
    );
  }

  // if there's no error, the whole page will display the game board.
  return (
    <div>
      {/* The first part is the title that welcomes the players or congratulates them when there's a winner. */}
      <div className="title">
        {/Winner/.test(gameStatus)
          ? "Congrats!"
          : /Draw/.test(gameStatus)
            ? "You're both good!"
            : "Welcome to Tic-Tac-Toe!"}
      </div>

      {/* The second part of the game that dictates whose turn is it or who's the winner. */}
      <div className="status">{gameStatus}</div>

      {/* The board tiles to be displayed */}
      <div className="board">
        {showTile(0)}
        {showTile(1)}
        {showTile(2)}
        {showTile(3)}
        {showTile(4)}
        {showTile(5)}
        {showTile(6)}
        {showTile(7)}
        {showTile(8)}
        {showTile(9)}
      </div>

      {/* The restart button for playing a new game or just for resetting the board */}
      <button className="restart" onClick={restart}>
        Restart
      </button>

      {/* Footer for identification of the project */}
      <footer>
        Created by Ryan Gerome Regis from KodeGO WebDev Batch 3 as the technical
        exam for the Hive Gaming company.
      </footer>
    </div>
  );
}

// The App function component that is to be rendered in main.tsx
function App() {
  return (
    <div className="game">
      <Board />
    </div>
  );
}

export default App;
