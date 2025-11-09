export type Player = 'X' | 'O';
export type CellValue = null | Player;
export type Winner = null | Player | 'draw';
export type Position = [number, number];

export interface GameState {
  // Core game state
  board: CellValue[][];
  currentPlayer: Player;
  winner: Winner;
  winningLine: Position[] | null;

  // Scoring and history
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  matchHistory: Array<{
    winner: Player | 'draw';
    moves: number;
    timestamp: Date;
  }>;

  // UI state
  isAnimating: boolean;
  lastMove: Position | null;
}

export interface GameActions {
  // Game actions
  makeMove: (row: number, col: number) => void;
  newGame: () => void;
  resetScores: () => void;
  setAnimating: (isAnimating: boolean) => void;
}

export interface GameStore extends GameState, GameActions {}

export interface WinResult {
  winner: Winner;
  winningLine: Position[] | null;
}

export interface MoveResult {
  success: boolean;
  error?: string;
}