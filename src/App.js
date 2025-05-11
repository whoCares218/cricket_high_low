import React, { useState, useEffect } from "react";
import { players } from "./players";
import "./styles.css";

function CricketHighLow() {
  const modes = [
    "Runs",
    "Wickets",
    "Fours",
    "Sixes",
    "Average",
    "Strike Rate",
    "Fifties",
    "Hundreds",
    "Total Matches Played",
  ];

  const [selectedMode, setSelectedMode] = useState(null);
  const [playersToCompare, setPlayersToCompare] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0); // Track best score
  const [result, setResult] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (selectedMode) {
      startNewRound();
    }
  }, [selectedMode]);

  const startNewRound = () => {
    setGameOver(false);
    setResult("");
    setScore(0); // Reset score at the start of a new round

    if (players.length < 2) {
      console.error("Not enough players available in the data.");
      setResult("Error: Not enough players available.");
      return;
    }

    const randomPlayers = [];
    while (randomPlayers.length < 2) {
      const player = players[Math.floor(Math.random() * players.length)];
      if (!randomPlayers.includes(player)) {
        randomPlayers.push(player);
      }
    }

    setPlayersToCompare(randomPlayers);
    setCurrentPlayer(randomPlayers[0]);
  };

  const handleGuess = (guess) => {
    if (gameOver) return;

    const nextPlayer = playersToCompare[1];
    if (!currentPlayer || !nextPlayer) {
      console.error("Game malfunction. Please restart.");
      setResult("Error: Game malfunction. Please restart.");
      setGameOver(true);
      return;
    }

    const currentPlayerStat =
      currentPlayer[selectedMode.toLowerCase()] == null
        ? 0
        : currentPlayer[selectedMode.toLowerCase()];
    const nextPlayerStat =
      nextPlayer[selectedMode.toLowerCase()] == null
        ? 0
        : nextPlayer[selectedMode.toLowerCase()];

    const isHigher = nextPlayerStat > currentPlayerStat;

    if ((guess === "higher" && isHigher) || (guess === "lower" && !isHigher)) {
      setScore(score + 1);
      setResult("Correct! Next Player...");

      if (score + 1 > bestScore) {
        setBestScore(score + 1); // Update best score if necessary
      }

      // Update players: shift next player to current and pick a new challenger.
      const newPlayers = [nextPlayer];
      while (newPlayers.length < 2) {
        const player = players[Math.floor(Math.random() * players.length)];
        if (!newPlayers.includes(player)) {
          newPlayers.push(player);
        }
      }
      setPlayersToCompare(newPlayers);
      setCurrentPlayer(newPlayers[0]);
    } else {
      setResult("Incorrect! Game Over.");
      setScore(0); // Reset score on incorrect guess
      setGameOver(true);
    }
  };

  const handleModeChange = (e) => {
    const selected = e.target.value;
    if (selected !== "") {
      setSelectedMode(selected);
    }
  };

  return (
    
    <div className="game-container">
      <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
  <iframe src="https://geo.dailymotion.com/player.html?video=x81y39i"
    style="width:100%; height:100%; position:absolute; left:0px; top:0px; overflow:hidden; border:none;"
    allowfullscreen
    title="Dailymotion Video Player"
    allow="web-share">
  </iframe> 
   </div>
      <header className="game-header">
        <h1 className="game-title">Cricket High-Low Game</h1>
        <div className="score-board">
          <span className="score-label">Score: {score}</span>
          <span className="best-score-label">Best Score: {bestScore}</span>
        </div>
      </header>

      {!selectedMode ? (
        <div className="dropdown-container">
          <select
            className="mode-dropdown"
            defaultValue=""
            onChange={handleModeChange}
          >
            <option value="" disabled>
              Select a game mode
            </option>
            {modes.map((mode, index) => (
              <option key={index} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="game-main">
          <div className="players-container">
            <div className="player-card">
              <h2 className="player-name">{currentPlayer?.name}</h2>
              <div className="player-stat">
                <span className="stat-value">
                  {currentPlayer &&
                  currentPlayer[selectedMode.toLowerCase()] != null
                    ? currentPlayer[selectedMode.toLowerCase()]
                    : 0}
                </span>
                <span className="stat-label">{selectedMode}</span>
              </div>
             
            </div>

            <div className="vs-container">VS</div>

            <div className="player-card">
              <h2 className="player-name">{playersToCompare[1]?.name}</h2>
              <div className="player-stat">
                <span className="stat-label">{selectedMode}</span>
                <span className="stat-mystery">?</span>
              </div>
              <div className="guess-buttons">
                <button
                  className="guess-button higher "
                  onClick={() => handleGuess("higher")}
                  disabled={gameOver}
                >
                  Higher
                </button>
                <button
                  className="guess-button lower"
                  onClick={() => handleGuess("lower")}
                  disabled={gameOver}
                >
                  Lower
                </button>
              </div>
            </div>
          </div>

          {result && (
            <div className={`result-banner ${gameOver ? "error" : "success"}`}>
              {result}
            </div>
          )}

          {gameOver && (
            <button className="restart-button" onClick={startNewRound}>
              Play Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CricketHighLow;
