import express from "express";
import BoardStateEvaluator from "./BoardStateEvaluator";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

const buildPath = path.join(__dirname, "../client/dist");
app.use(express.static(buildPath));
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

type Tiles = ("X" | "O" | null)[];
type Next = "X" | "O";
type Winner = "X" | "O" | null;

interface BoardParams {
  tiles: Tiles;
  tileNumber: number;
  nextPlayer: Next;
  winner: Winner;
  gameStatus: string;
}

app.post("/api", (request, response) => {
  try {
    const { tiles, tileNumber, nextPlayer, winner, gameStatus }: BoardParams =
      request.body;
    const boardStateData = BoardStateEvaluator(
      tiles,
      tileNumber,
      nextPlayer,
      winner,
      gameStatus
    );
    response.json(boardStateData);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
