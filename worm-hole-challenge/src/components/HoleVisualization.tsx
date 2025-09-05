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
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        🕳️ Visualização do Buraco
      </h2>
      
      {/* Container do buraco */}
      <div className="relative mx-auto bg-gray-800 rounded-lg overflow-hidden" style={{ height: '300px', width: '200px' }}>
        
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
                <span className="absolute -left-8 text-xs text-gray-500 font-mono">
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
          <div className="text-4xl">🐛</div>
        </div>

        {/* Linha da metade do caminho */}
        <div
          className="absolute w-full border-t-2 border-yellow-400 opacity-60"
          style={{ top: '50%' }}
        >
          <span className="absolute -left-12 text-xs text-yellow-600 font-semibold">
            Metade
          </span>
        </div>

        {/* Linha do topo */}
        <div className="absolute top-0 w-full border-t-4 border-green-500">
          <span className="absolute -left-12 text-xs text-green-600 font-semibold">
            Saída
          </span>
        </div>

        {/* Fundo do buraco */}
        <div className="absolute bottom-0 w-full h-2 bg-gray-900 rounded-b-lg"></div>
      </div>

      {/* Informações da posição */}
      <div className="mt-4 text-center">
        <div className="text-lg font-semibold text-gray-700">
          Posição atual: <span className="text-blue-600">{currentPosition.toFixed(1)}cm</span>
        </div>
        <div className="text-sm text-gray-500">
          Tentativa: <span className="font-semibold">{attempts}</span>
        </div>
        <div className="text-sm text-gray-500">
          Profundidade: <span className="font-semibold">{depth}cm</span>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>0cm</span>
          <span>Metade ({depth/2}cm)</span>
          <span>{depth}cm</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${(currentPosition / depth) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
