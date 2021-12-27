import { useState } from "react";
import axios from "axios";
import "./App.css";

type Tiles = ("X" | "O" | null)[];
type Next = "X" | "O";
type Winner = "X" | "O" | null;

function Board(): JSX.Element {
  const [tiles, setTiles] = useState<Tiles>(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState<Next>("X");
  const [winner, setWinner] = useState<Winner>(null);
  const [gameStatus, setGameStatus] = useState<string>(
    `Player ${nextPlayer}'s Turn.`
  );

  const [error, setError] = useState<any>(null);

  async function chooseTile(tileNumber: number): Promise<void> {
    if (winner || tiles[tileNumber]) {
      return;
    }

    const boardState = {
      tiles: tiles,
      tileNumber: tileNumber,
      nextPlayer: nextPlayer,
      winner: winner,
      gameStatus: gameStatus,
    };

    await axios
      .post("/api", boardState)
      .then((response) => {
        setTiles(response.data.tiles);
        setNextPlayer(response.data.nextPlayer);
        setWinner(response.data.winner);
        setGameStatus(response.data.gameStatus);
      })
      .catch((error) => {
        console.log("Error receiving data:", error);
        setError(error);
      });
  }

  function restart() {
    setNextPlayer("X");
    setTiles(Array(9).fill(null));
    setWinner(null);
    setGameStatus(`Player X's Turn.`);
  }

  function showTile(i: number): React.ReactNode {
    return (
      <button className="tile" onClick={() => chooseTile(i)}>
        {tiles[i]}
      </button>
    );
  }

  if (error) {
    return (
      <div>
        <h3>
          Error receiving data. <br /> Error: {error}
        </h3>
      </div>
    );
  }

  return (
    <div>
      <div className="title">
        {/Winner/.test(gameStatus)
          ? "Congrats!"
          : /Draw/.test(gameStatus)
            ? "You're both good!"
            : "Welcome to Tic-Tac-Toe!"}
      </div>
      <div className="status">{gameStatus}</div>
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
      <button className="restart" onClick={restart}>
        Restart
      </button>
      <footer>
        Created by Ryan Gerome Regis from KodeGO WebDev Batch 3 as the technical
        exam for the Hive Gaming company.
      </footer>
    </div>
  );
}

function App() {
  return (
    <div className="game">
      <Board />
    </div>
  );
}

export default App;
