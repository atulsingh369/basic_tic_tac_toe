'use client';

import React, { useEffect } from 'react';
import { GameBoard } from '@/components/GameBoard';
import { PlayerPanel } from '@/components/PlayerPanel';
import { Confetti } from '@/components/Confetti';
import { useGameStore } from '@/store/gameStore';

export default function Home() {
  const { winner, setAnimating } = useGameStore();

  // Handle confetti animation trigger
  useEffect(() => {
    if (winner !== null) {
      setAnimating(true);
      // Stop animation after 3 seconds
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [winner, setAnimating]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
          Tic Tac Toe
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Two-player game with Google-inspired design
        </p>
      </header>

      {/* Main Game Container */}
      <main className="max-w-6xl mx-auto">
        {/* Side-by-side layout for larger screens */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">

          {/* Player Panel - Left side on desktop, top on mobile */}
          <div className="w-full lg:w-80 xl:w-96">
            <PlayerPanel />
          </div>

          {/* Game Board - Right side on desktop, below panel on mobile */}
          <div className="flex-1 flex justify-center items-center min-h-[400px]">
            <GameBoard />
          </div>
        </div>
      </main>

      {/* Confetti animation */}
      {winner !== null && winner !== 'draw' && <Confetti />}

      {/* Footer */}
      <footer className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
        <p>Built with Next.js, React, and Tailwind CSS</p>
      </footer>
    </div>
  );
}