type Tiles = ("X" | "O" | null)[];
type Next = "X" | "O";
type Winner = "X" | "O" | null;

export default function BoardStateEvaluator(
  tiles: Tiles,
  tilesNumber: number,
  nextPlayer: Next,
  winner: Winner,
  gameStatus: string
) {
  let tilesCopy = [...tiles];
  tilesCopy[tilesNumber] = nextPlayer;
  tiles = tilesCopy;

  function getGameStatus(winner: Winner, tiles: Tiles, nextPlayer: Next) {
    return winner
      ? `Winner: Player ${winner}`
      : tiles.every(Boolean)
      ? "Draw"
      : `Player ${nextPlayer}'s Turn.`;
  }

  function getNextPlayer(tiles: Tiles) {
    return tiles.filter(Boolean).length % 2 === 0 ? "X" : "O";
  }

  function getWinner(tiles: Tiles) {
    const winningTiles = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningTiles.length; i++) {
      const [a, b, c] = winningTiles[i];
      if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
        return tiles[a];
      }
    }
    return null;
  }

  nextPlayer = getNextPlayer(tiles);
  winner = getWinner(tiles);
  gameStatus = getGameStatus(winner, tiles, nextPlayer);

  return {
    tiles: tiles,
    nextPlayer: nextPlayer,
    winner: winner,
    gameStatus: gameStatus,
  };
}
