import { create } from 'zustand';
import { GameStore, Player } from '@/types/game';
import {
  createEmptyBoard,
  checkWinner,
  isValidMove,
  getNextPlayer,
  countMoves
} from '@/utils/gameLogic';

const initialState: Omit<GameStore, 'makeMove' | 'newGame' | 'resetScores' | 'setAnimating'> = {
  board: createEmptyBoard(),
  currentPlayer: 'X',
  winner: null,
  winningLine: null,
  scores: {
    X: 0,
    O: 0,
    draws: 0,
  },
  matchHistory: [],
  isAnimating: false,
  lastMove: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  makeMove: (row: number, col: number) => {
    const state = get();

    // Validate move
    if (state.winner !== null) {
      return; // Game is already over
    }

    if (!isValidMove(state.board, row, col)) {
      return; // Invalid move
    }

    // Create new board with the move
    const newBoard = state.board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? state.currentPlayer : cell
      )
    );

    // Check for winner
    const result = checkWinner(newBoard);
    const movesCount = countMoves(newBoard);

    // Update scores if game ended
    let newScores = { ...state.scores };
    if (result.winner !== null) {
      if (result.winner === 'X') {
        newScores.X += 1;
      } else if (result.winner === 'O') {
        newScores.O += 1;
      } else if (result.winner === 'draw') {
        newScores.draws += 1;
      }
    }

    // Add to match history
    const newMatchHistory = [
      {
        winner: result.winner || 'draw', // Fallback, should never be null here
        moves: movesCount,
        timestamp: new Date(),
      },
      ...state.matchHistory.slice(0, 4), // Keep only last 5 matches
    ];

    set({
      board: newBoard,
      currentPlayer: result.winner !== null ? state.currentPlayer : getNextPlayer(state.currentPlayer),
      winner: result.winner,
      winningLine: result.winningLine,
      scores: newScores,
      matchHistory: newMatchHistory,
      lastMove: [row, col],
      isAnimating: result.winner !== null, // Trigger animation on win/draw
    });
  },

  newGame: () => {
    const state = get();
    set({
      board: createEmptyBoard(),
      currentPlayer: 'X',
      winner: null,
      winningLine: null,
      isAnimating: false,
      lastMove: null,
      // Keep scores and match history
    });
  },

  resetScores: () => {
    set({
      scores: {
        X: 0,
        O: 0,
        draws: 0,
      },
      matchHistory: [],
      ...initialState, // Reset game state
    });
  },

  setAnimating: (isAnimating: boolean) => {
    set({ isAnimating });
  },
}));