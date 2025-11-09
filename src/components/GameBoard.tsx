'use client';

import React, { useEffect, useRef } from 'react';
import { Cell } from './Cell';
import { useGameStore } from '@/store/gameStore';

export const GameBoard: React.FC = () => {
  const { makeMove, board, winner } = useGameStore();
  const boardRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!boardRef.current) return;

      const focusedElement = document.activeElement;
      if (!focusedElement || !focusedElement.getAttribute('data-cell')) return;

      const [rowStr, colStr] = focusedElement.getAttribute('data-cell')!.split('-');
      let row = parseInt(rowStr);
      let col = parseInt(colStr);

      let newRow = row;
      let newCol = col;
      let handled = false;

      switch (event.key) {
        case 'ArrowUp':
          newRow = Math.max(0, row - 1);
          handled = true;
          break;
        case 'ArrowDown':
          newRow = Math.min(2, row + 1);
          handled = true;
          break;
        case 'ArrowLeft':
          newCol = Math.max(0, col - 1);
          handled = true;
          break;
        case 'ArrowRight':
          newCol = Math.min(2, col + 1);
          handled = true;
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (winner === null && board[row][col] === null) {
            makeMove(row, col);
          }
          handled = true;
          break;
      }

      if (handled) {
        event.preventDefault();
        if (event.key.startsWith('Arrow')) {
          const newCell = boardRef.current.querySelector(
            `[data-cell="${newRow}-${newCol}"]`
          ) as HTMLElement;
          if (newCell) {
            newCell.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [makeMove, board, winner]);

  return (
    <div
      ref={boardRef}
      className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-lg"
      role="grid"
      aria-label="Tic Tac Toe game board"
      tabIndex={0}
    >
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => (
          <div key={`${row}-${col}`} role="gridcell">
            <Cell row={row} col={col} />
          </div>
        ))
      )}
    </div>
  );
};