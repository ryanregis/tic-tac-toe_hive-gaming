"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BoardStateEvaluator_1 = __importDefault(require("./BoardStateEvaluator"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const buildPath = path_1.default.join(__dirname, "../client/dist");
app.use(express_1.default.static(buildPath));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../client/dist", "index.html"));
});
app.post("/api", (request, response) => {
    try {
        const { tiles, tileNumber, nextPlayer, winner, gameStatus } = request.body;
        const boardStateData = (0, BoardStateEvaluator_1.default)(tiles, tileNumber, nextPlayer, winner, gameStatus);
        response.json(boardStateData);
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. ${PORT === 3000 ? "http://localhost:3000/" : ""}`);
});
