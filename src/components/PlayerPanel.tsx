'use client';

import React from 'react';
import { useGameStore } from '@/store/gameStore';

export const PlayerPanel: React.FC = () => {
  const {
    currentPlayer,
    winner,
    scores,
    matchHistory,
    newGame,
    resetScores,
  } = useGameStore();

  const getTurnIndicator = () => {
    if (winner === 'X') return 'X Wins!';
    if (winner === 'O') return 'O Wins!';
    if (winner === 'draw') return "It's a Draw!";
    return `${currentPlayer}'s Turn`;
  };

  const getTurnColor = () => {
    if (winner === 'X') return '#4285f4';
    if (winner === 'O') return '#ea4335';
    if (winner === 'draw') return '#5f6368';
    return currentPlayer === 'X' ? '#4285f4' : '#ea4335';
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  const getWinnerColor = (winner: string) => {
    if (winner === 'X') return 'text-blue-500 dark:text-blue-400';
    if (winner === 'O') return 'text-red-500 dark:text-red-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-full">
      {/* Current Turn Indicator */}
      <div className="text-center">
        <h2
          className="text-xl sm:text-2xl font-bold transition-all duration-300"
          style={{ color: getTurnColor() }}
          role="status"
          aria-live="polite"
          aria-label={getTurnIndicator()}
        >
          {getTurnIndicator()}
        </h2>
      </div>

      {/* Score Display */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center mb-3">
          Score
        </h3>
        <div className="flex justify-around items-center gap-4">
          <div className="text-center">
            <div
              className="text-3xl font-bold"
              style={{ color: '#4285f4' }}
              aria-label={`X has ${scores.X} wins`}
            >
              {scores.X}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">X</div>
          </div>
          <div className="text-center">
            <div
              className="text-3xl font-bold text-gray-500 dark:text-gray-400"
              aria-label={`${scores.draws} draws`}
            >
              {scores.draws}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Draws</div>
          </div>
          <div className="text-center">
            <div
              className="text-3xl font-bold"
              style={{ color: '#ea4335' }}
              aria-label={`O has ${scores.O} wins`}
            >
              {scores.O}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">O</div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={newGame}
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          aria-label="Start new game"
        >
          New Game
        </button>
        <button
          onClick={resetScores}
          className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          aria-label="Reset all scores"
        >
          Reset Scores
        </button>
      </div>

      {/* Match History */}
      {matchHistory.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center mb-3">
            Recent Games
          </h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {matchHistory.map((match, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
                aria-label={`Game ${index + 1}: ${match.winner} in ${match.moves} moves, ${formatTime(match.timestamp)}`}
              >
                <span className={`font-medium ${getWinnerColor(match.winner)}`}>
                  {match.winner === 'draw' ? 'Draw' : `${match.winner} wins`}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{match.moves} moves</span>
                  <span>•</span>
                  <span>{formatTime(match.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};