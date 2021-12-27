"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function BoardStateEvaluator(tiles, tilesNumber, nextPlayer, winner, gameStatus) {
    let tilesCopy = [...tiles];
    tilesCopy[tilesNumber] = nextPlayer;
    tiles = tilesCopy;
    function getGameStatus(winner, tiles, nextPlayer) {
        return winner
            ? `Winner: Player ${winner}`
            : tiles.every(Boolean)
                ? "Draw"
                : `Player ${nextPlayer}'s Turn.`;
    }
    function getNextPlayer(tiles) {
        return tiles.filter(Boolean).length % 2 === 0 ? "X" : "O";
    }
    function getWinner(tiles) {
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
exports.default = BoardStateEvaluator;
