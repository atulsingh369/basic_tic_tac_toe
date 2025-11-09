import { CellValue, Player, WinResult, Position } from '@/types/game';

export const createEmptyBoard = (): CellValue[][] => [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const checkWinner = (board: CellValue[][]): WinResult => {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2]) {
      return {
        winner: board[row][0] as Player,
        winningLine: [[row, 0], [row, 1], [row, 2]]
      };
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col]) {
      return {
        winner: board[0][col] as Player,
        winningLine: [[0, col], [1, col], [2, col]]
      };
    }
  }

  // Check diagonals
  if (board[0][0] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]) {
    return {
      winner: board[0][0] as Player,
      winningLine: [[0, 0], [1, 1], [2, 2]]
    };
  }

  if (board[0][2] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]) {
    return {
      winner: board[0][2] as Player,
      winningLine: [[0, 2], [1, 1], [2, 0]]
    };
  }

  // Check for draw
  const isDraw = board.every(row => row.every(cell => cell !== null));
  if (isDraw) {
    return {
      winner: 'draw',
      winningLine: null
    };
  }

  // No winner yet
  return {
    winner: null,
    winningLine: null
  };
};

export const isValidMove = (board: CellValue[][], row: number, col: number): boolean => {
  if (row < 0 || row >= 3 || col < 0 || col >= 3) {
    return false;
  }
  return board[row][col] === null;
};

export const isGameOver = (board: CellValue[][]): boolean => {
  const result = checkWinner(board);
  return result.winner !== null;
};

export const getNextPlayer = (currentPlayer: Player): Player => {
  return currentPlayer === 'X' ? 'O' : 'X';
};

export const countMoves = (board: CellValue[][]): number => {
  return board.flat().filter(cell => cell !== null).length;
};

export const isInWinningLine = (row: number, col: number, winningLine: Position[] | null): boolean => {
  if (!winningLine) return false;
  return winningLine.some(([r, c]) => r === row && c === col);
};