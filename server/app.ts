// Importing ExpressJS, the framework used for creating the back-end server
import express from "express";

// Importing the Board State Evaluator Function
import BoardStateEvaluator from "./BoardStateEvaluator";

// Importing path module that is included with NodeJS
import path from "path";

//Setting app constant as the expressJS function
const app = express();

// Setting PORT constant to process.env.port if available else PORT is equal to 3000
const PORT = process.env.PORT || 3000;

// Setting buildPath constant to the path of where the front-end react.js is built
const buildPath = path.join(__dirname, "../client/dist");

// Using the buildPath constant to display the html
app.use(express.static(buildPath));

// express.json() function is used so that Express can turn the request and responses into JSON format.
app.use(express.json());

// Display the main HTML page for all routes unless otherwise specified
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

//Type Declaration for the parameters/board states
type Tiles = ("X" | "O" | null)[];
type Next = "X" | "O";
type Winner = "X" | "O" | null;

// Interface type declaration for the array destructuring of request.body
interface BoardParams {
  tiles: Tiles;
  tileNumber: number;
  nextPlayer: Next;
  winner: Winner;
  gameStatus: string;
}

// The function that's going to run when there's a POST request of /api from the client
app.post("/api", (request, response) => {

  // If no error encountered, do this
  try {
    // Declaration of constants through the destructuring of request.body
    const { tiles, tileNumber, nextPlayer, winner, gameStatus }: BoardParams =
      request.body;

    // Setting boardStateData the result of inputting the parameters to the BoardStateEvaluatpr function
    const boardStateData = BoardStateEvaluator(
      tiles,
      tileNumber,
      nextPlayer,
      winner,
      gameStatus
    );

    //Send the boardStateData JSON response to the client
    response.json(boardStateData);
  } 
  
  // if an error is encountered, log the error to the console.
  catch (error) {
    console.log(error);
  }
});

// The function for listening to the port and so that the sever can run.
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}. ${
      PORT === 3000 ? "http://localhost:3000/" : ""
    }`
  );
});
