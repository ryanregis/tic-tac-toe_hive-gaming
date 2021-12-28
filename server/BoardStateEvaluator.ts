// Type Declaration for the parameters/board states
type Tiles = ("X" | "O" | null)[];
type Next = "X" | "O";
type Winner = "X" | "O" | null;

// The function responsible for evaluating whose turn it is, who's the winner, and the status of the game itself.
export default function BoardStateEvaluator(
  // Type declaration for the input parameters
  tiles: Tiles,
  tilesNumber: number,
  nextPlayer: Next,
  winner: Winner,
  gameStatus: string
) {

  // Copying the tiles array and setting the content of it by the 'nextPlayer' variable  which is
  // determined by the 'tilesNumber' variable
  let tilesCopy = [...tiles]; //copy the 'tiles' variable
  tilesCopy[tilesNumber] = nextPlayer; //set the content of the element in the array by whose player's turn it was
  tiles = tilesCopy; // set the original array by the changed array


  // The function for updating the game status
  function getGameStatus(winner: Winner, tiles: Tiles, nextPlayer: Next) {
    return winner
      ? `Winner: Player ${winner}`
      : tiles.every(Boolean)
      ? "Draw"
      : `Player ${nextPlayer}'s Turn.`;
  }

  // The function for updating the player's turn
  function getNextPlayer(tiles: Tiles) {
    return tiles.filter(Boolean).length % 2 === 0 ? "X" : "O";
  }

  // The function for getting the winner of the game, returns null if there's no winner yet or the game is a draw.
  function getWinner(tiles: Tiles) {
    // The constant number combinations for every winning move in tic-tac-toe
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

    // Iterating through the array to check if the number inside the winning combinations array
    // is the same as the combinations of content inside the 'tiles' array
    for (let i = 0; i < winningTiles.length; i++) {
      // Array destructuring of the number combination in the winningTiles array
      const [a, b, c] = winningTiles[i];

      //If the tiles array elements have the same content dictated by the
      // destructured variables then a winner (X or O) is returned
      if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
        return tiles[a];
      }
    }

    return null;
  }

  //Setting the variables by the returns of the functions used above
  nextPlayer = getNextPlayer(tiles);
  winner = getWinner(tiles);
  gameStatus = getGameStatus(winner, tiles, nextPlayer);

  // Return the evaluated data as an object
  return {
    tiles: tiles,
    nextPlayer: nextPlayer,
    winner: winner,
    gameStatus: gameStatus,
  };
}
