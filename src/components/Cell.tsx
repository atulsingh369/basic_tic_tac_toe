'use client';

import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { isInWinningLine } from '@/utils/gameLogic';

interface CellProps {
  row: number;
  col: number;
}

export const Cell: React.FC<CellProps> = React.memo(({ row, col }) => {
  const { board, winner, winningLine, makeMove, lastMove } = useGameStore();

  const cellValue = board[row][col];
  const isWinningCell = isInWinningLine(row, col, winningLine);
  const isLastMove = lastMove?.[0] === row && lastMove?.[1] === col;
  const isDisabled = winner !== null || cellValue !== null;

  const handleClick = () => {
    if (!isDisabled) {
      makeMove(row, col);
    }
  };

  const getCellContent = () => {
    if (cellValue === 'X') {
      return (
        <span className="text-blue-500 select-none" style={{ color: '#4285f4' }}>
          X
        </span>
      );
    }
    if (cellValue === 'O') {
      return (
        <span className="text-red-500 select-none" style={{ color: '#ea4335' }}>
          O
        </span>
      );
    }
    return null;
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      data-cell={`${row}-${col}`}
      className={`
        relative flex items-center justify-center
        aspect-square rounded-lg
        border transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        dark:focus:ring-blue-600 dark:focus:ring-offset-gray-900
        ${isWinningCell
          ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
        }
        ${isLastMove && !isWinningCell
          ? 'bg-gray-50 dark:bg-gray-750'
          : ''
        }
        ${!isDisabled
          ? 'hover:bg-gray-50 dark:hover:bg-gray-750 hover:scale-105 hover:shadow-md cursor-pointer'
          : 'cursor-default'
        }
        ${cellValue !== null
          ? 'animate-in fade-in zoom-in duration-300'
          : ''
        }
      `}
      style={{
        width: 'clamp(80px, 20vw, 120px)',
        height: 'clamp(80px, 20vw, 120px)',
      }}
      aria-label={`Cell ${row + 1}, ${col + 1}${cellValue ? `, contains ${cellValue}` : ', empty'}${isWinningCell ? ', winning cell' : ''}`}
      aria-pressed={cellValue !== null}
      aria-disabled={isDisabled}
      role="gridcell"
      tabIndex={isDisabled ? -1 : 0}
    >
      <span
        className="text-4xl sm:text-5xl lg:text-6xl font-bold"
        style={{
          animation: cellValue !== null ? 'cellEntry 0.3s ease-out' : undefined,
        }}
        aria-hidden="true"
      >
        {getCellContent()}
      </span>

      {isWinningCell && (
        <div
          className="absolute inset-0 bg-blue-200 dark:bg-blue-800/30 rounded-lg animate-in fade-in zoom-in duration-500"
          aria-hidden="true"
        />
      )}
    </button>
  );
});

Cell.displayName = 'Cell';