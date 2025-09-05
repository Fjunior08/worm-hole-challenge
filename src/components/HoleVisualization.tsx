'use client';

import React from 'react';

interface HoleVisualizationProps {
  depth: number;
  currentPosition: number;
  isAnimating: boolean;
  attempts: number;
}

export const HoleVisualization: React.FC<HoleVisualizationProps> = ({
  depth,
  currentPosition,
  isAnimating,
  attempts
}) => {
  // Calcula a posição da minhoca em pixels (invertido porque 0 é o fundo)
  const wormPosition = Math.max(0, Math.min(depth - currentPosition, depth));
  const wormPercentage = (wormPosition / depth) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
        🕳️ Visualização do Buraco
      </h2>
      
      {/* Container responsivo do buraco */}
      <div className="flex justify-center mb-4">
        <div className="relative bg-gray-800 rounded-lg overflow-hidden w-full max-w-xs sm:max-w-sm" style={{ height: '250px', minHeight: '200px' }}>
          
          {/* Marcações de profundidade */}
          <div className="absolute left-0 top-0 w-full h-full">
            {Array.from({ length: Math.floor(depth / 5) + 1 }, (_, i) => {
              const markDepth = i * 5;
              const markPosition = (markDepth / depth) * 100;
              return (
                <div
                  key={i}
                  className="absolute w-full border-t border-gray-600 opacity-30"
                  style={{ top: `${markPosition}%` }}
                >
                  <span className="absolute -left-6 sm:-left-8 text-xs text-gray-500 font-mono whitespace-nowrap">
                    {markDepth}cm
                  </span>
                </div>
              );
            })}
          </div>

          {/* Minhoca animada */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
              isAnimating ? 'animate-bounce' : ''
            }`}
            style={{ 
              bottom: `${wormPercentage}%`,
              transition: isAnimating ? 'bottom 1s ease-in-out' : 'none'
            }}
          >
            <div className="text-2xl sm:text-4xl">🐛</div>
          </div>

          {/* Linha da metade do caminho */}
          <div
            className="absolute w-full border-t-2 border-yellow-400 opacity-60"
            style={{ top: '50%' }}
          >
            <span className="absolute -left-8 sm:-left-12 text-xs text-yellow-600 font-semibold whitespace-nowrap">
              Metade
            </span>
          </div>

          {/* Linha do topo */}
          <div className="absolute top-0 w-full border-t-4 border-green-500">
            <span className="absolute -left-8 sm:-left-12 text-xs text-green-600 font-semibold whitespace-nowrap">
              Saída
            </span>
          </div>

          {/* Fundo do buraco */}
          <div className="absolute bottom-0 w-full h-2 bg-gray-900 rounded-b-lg"></div>
        </div>
      </div>

      {/* Informações da posição */}
      <div className="text-center mb-4">
        <div className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
          Posição atual: <span className="text-blue-600">{currentPosition.toFixed(1)}cm</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div>
            Tentativa: <span className="font-semibold">{attempts}</span>
          </div>
          <div>
            Profundidade: <span className="font-semibold">{depth}cm</span>
          </div>
        </div>
      </div>

      {/* Barra de progresso responsiva */}
      <div className="w-full">
        <div className="flex justify-between text-xs text-gray-600 mb-2 px-2">
          <span className="truncate">0cm</span>
          <span className="truncate mx-2">Metade ({depth/2}cm)</span>
          <span className="truncate">{depth}cm</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min((currentPosition / depth) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
