
<h6 align="center">Technical Exam for the Hive Gaming Company created by Ryan Gerome Regis.</h6>
<h1 align="center">Tic-Tac-Toe</h1>

> A simple game consisting of a 3x3 grid in which players take turns making their mark (cross or
circle) until either one player achieves a connected line of 3 marks or the board state
prevents either player from achieving a line of 3 marks which results in a draw.

<hr>
<h3 align="center"><a id="liveSiteLink" href="https://tic-tac-toe-hive-gaming.herokuapp.com/">Click to view live site</a></h3>
<hr>


The following are the web development tools and languages used for creating this technical exam:

| Category  | Development Tools and Programming Languages Used                                                                                                        |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| Front-End | - **React.js Typescript** built and compiled using Vite.js<br> - **Axios** for sending POST requests and receiving the response to and from the server. |
| Back-End  | - **NodeJS** with **ExpressJS Framework** for the creation of the server.                                                                                                               |

<hr>

The project structure is as follows:
```
tic-tac-toe-hive-gaming (root folder)
│   ..
│   Procfile (used for Heroku Deployment)
│   package.json (contains the scripts to run the project inside local or during deployment)
│   ...
│
└── client (contains React TypeScript Files template by vite.js)
│   │   ...
│   │   index.html (the dev index.html, the actual index.html that is displayed after building is inside the dist* folder. *Not here because it appears after building.)
│   │   ...
│   │
│   └── src (source folder for vite.js)
│       │   App.css (external stylesheet for App.tsx)
│       │   App.tsx (The App component of the project)
│       │   index.css (external stylesheet for main.tsx)
│       │   main.tsx (The rendering component for the project)
│       │   ...   
│
└── server (contains the back-end server NodeJS files )
    │   ...
    │   app.js (Compiled JS file of app.ts)
    │   app.ts (TypeScript file that contains the back-end server codes.)
    │   BoardStateEvaluator.js (Compiled JS file of BoardStateEvaluator.ts)
    |   BoardStateEvaluator.ts (Contains the function that determines the board/game state.)
    │   ...
```
<hr>


### Execution Instructions
These instructions are for running it into your local machine. You can click the [live site link](#liveSiteLink) above to view the already deployed project.

1. Go to [this link](https://gitfront.io/r/user-2500572/2a6a86812db181e1483db0ea94ae5b9af9782ce1/tic-tac-toe-hive-gaming/) to view the repository.  
     >If you already have the repository cloned into your machine or you have already extracted the zip file, go to step 2.

    1. Click the **clone** button on the top right of the display.
    2. A link should appear and the clone button becomes **copy**.
    3. Click **copy** and open your VSCode Terminal.
    4. Run the following command to your terminal:

    ```javascript
    git clone [copied url]
    ```
   5. There should be a folder named `tic-tac-toe-hive-gaming` in your explorer that appeared. Run the following command to go into the root of the folder: 
   ```javascript
    cd tic-tac-toe-hive-gaming
    ```

2. Make sure you're in the root folder of the project and run the following command in the terminal:
   ```javascript
   npm run serve
   ```
3. Wait for the processes to finish and the terminal will show you the following text:
    ```javascript
    Server is running on port 3000. http://localhost:3000
    ```
4. You can play the game in your browser thtough the localhost link: http://localhost:3000.

<hr>

<h3 align="center">Compromises</h3>

- Instead of having a welcome page where the players can enter their names, the page is already at the board display with Player X going first.
- The result is already displayed on the page with the board, I would have liked it to be on a separate page for distinction of who won and lost the game.
- The styling is simplistic with a white background while the board is 'thistle' in color but I would improve the overall style and feel of the game.

<hr>

<h3 align="center">Error Cases</h3>  

- There might be some bug during the loading part of the game where the player can place their already chosen spot to another by quickly clicking another tile. <br><br>The solution might be is to make the whole board disabled or unable to be clicked while the client requests the server to evaluate the board state.

- Some errors can be seen when starting the game inside localhost, this seems to be the problem of my own slow machine. These errors might not show up if you have a faster machine.

- There might be some errors that I haven't taken into consideration.





