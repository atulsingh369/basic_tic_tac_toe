'use client';

import React from 'react';
import { Cell } from './Cell';

export const GameBoard: React.FC = () => {
  return (
    <div
      className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-lg"
      role="grid"
      aria-label="Tic Tac Toe game board"
    >
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => (
          <Cell key={`${row}-${col}`} row={row} col={col} />
        ))
      )}
    </div>
  );
};