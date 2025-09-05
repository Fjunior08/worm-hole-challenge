'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Hole, SimulationResult } from '../domain/entities/Worm';
import { SimulateWormMovement } from '../application/use-cases/SimulateWormMovement';
import { WormSimulationRepository, SimulationProgress } from '../infrastructure/repositories/WormSimulationRepository';
import { SimulationState, SimulationConfig } from '../shared/types/SimulationState';
import { HoleVisualization } from './HoleVisualization';

export const WormSimulation: React.FC = () => {
  const [config, setConfig] = useState<SimulationConfig>({
    depth: 20,
    climbDistance: 5,
    fallDistance: 3,
    pauseTime: 1
  });
  
  const [state, setState] = useState<SimulationState>('idle');
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [showHalfwayAlert, setShowHalfwayAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  // Estados para animação
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentAttempts, setCurrentAttempts] = useState(0);
  const [reachedHalfway, setReachedHalfway] = useState(false);

  const simulationRepository = useMemo(() => new WormSimulationRepository(), []);
  const simulateWormMovement = useMemo(() => new SimulateWormMovement(simulationRepository), [simulationRepository]);

  const handleStartSimulation = useCallback(async () => {
    setState('running');
    setResult(null);
    setShowHalfwayAlert(false);
    setShowSuccessAlert(false);
    
    // Reset estados de animação
    setCurrentPosition(0);
    setCurrentAttempts(0);
    setReachedHalfway(false);

    const hole: Hole = {
      depth: config.depth,
      climbDistance: config.climbDistance,
      fallDistance: config.fallDistance,
      pauseTime: config.pauseTime
    };

    // Configura callback de progresso
    simulationRepository.setProgressCallback((progress: SimulationProgress) => {
      setCurrentPosition(progress.position);
      setCurrentAttempts(progress.attempts);
      setReachedHalfway(progress.reachedHalfway);
    });

    try {
      const simulationResult = await simulateWormMovement.execute(hole);
      setResult(simulationResult);
      setState('completed');
      
      if (simulationResult.reachedHalfway) {
        setShowHalfwayAlert(true);
        setTimeout(() => setShowHalfwayAlert(false), 3000);
      }
      
      if (simulationResult.success) {
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
      }
    } catch (error) {
      console.error('Erro na simulação:', error);
      setState('idle');
    }
  }, [config, simulateWormMovement, simulationRepository]);

  const handleConfigChange = (field: keyof SimulationConfig, value: number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🐛 Desafio da Minhoca no Buraco
          </h1>
          <p className="text-lg text-gray-600">
            Simulação interativa de uma minhoca tentando sair de um buraco
          </p>
        </header>
        
        {/* Configurações */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Configurações do Buraco
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profundidade do buraco (cm)
              </label>
              <input
                type="number"
                value={config.depth}
                onChange={(e) => handleConfigChange('depth', Number(e.target.value))}
                disabled={state === 'running'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distância que sobe por vez (cm)
              </label>
              <input
                type="number"
                value={config.climbDistance}
                onChange={(e) => handleConfigChange('climbDistance', Number(e.target.value))}
                disabled={state === 'running'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distância que cai (cm)
              </label>
              <input
                type="number"
                value={config.fallDistance}
                onChange={(e) => handleConfigChange('fallDistance', Number(e.target.value))}
                disabled={state === 'running'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempo de pausa ao cair (segundos)
              </label>
              <input
                type="number"
                value={config.pauseTime}
                onChange={(e) => handleConfigChange('pauseTime', Number(e.target.value))}
                disabled={state === 'running'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                min="0"
                step="0.1"
              />
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={handleStartSimulation}
              disabled={state === 'running'}
              className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
                state === 'running'
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {state === 'running' ? '⏳ Simulando...' : '🚀 Iniciar Simulação'}
            </button>
          </div>
        </div>

        {/* Visualização Animada */}
        <HoleVisualization
          depth={config.depth}
          currentPosition={currentPosition}
          isAnimating={state === 'running'}
          attempts={currentAttempts}
        />

        {/* Alertas */}
        {showHalfwayAlert && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded-lg">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🟡</div>
              <div>
                <p className="text-lg font-semibold text-yellow-800">
                  A minhoca chegou na metade do caminho!
                </p>
                <p className="text-yellow-700">
                  Ela está a {Math.floor(config.depth / 2)}cm de profundidade
                </p>
              </div>
            </div>
          </div>
        )}

        {showSuccessAlert && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded-lg">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🟢</div>
              <div>
                <p className="text-lg font-semibold text-green-800">
                  A minhoca saiu do buraco!
                </p>
                <p className="text-green-700">
                  Parabéns! Ela conseguiu escapar!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Resultados */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Resultado da Simulação
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
                <p className={`text-lg font-bold ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                  {result.success ? 'Sucesso!' : 'Falhou'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Tentativas</h3>
                <p className="text-2xl font-bold text-blue-600">{result.attempts}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Posição Final</h3>
                <p className="text-lg font-semibold text-gray-800">{result.finalPosition}cm</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Chegou na Metade</h3>
                <p className={`text-lg font-semibold ${result.reachedHalfway ? 'text-green-600' : 'text-red-600'}`}>
                  {result.reachedHalfway ? 'Sim' : 'Não'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Status da simulação */}
        {state === 'running' && (
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="animate-spin text-2xl mr-3">⏳</div>
              <div>
                <p className="text-lg font-semibold text-blue-800">
                  Simulação em andamento...
                </p>
                <p className="text-blue-700">
                  Aguarde enquanto a minhoca tenta sair do buraco!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Informações sobre o desafio */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Sobre o Desafio
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              Este é um desafio clássico de programação onde uma minhoca tenta sair de um buraco.
              A cada tentativa, ela sobe uma certa distância, mas depois cai uma distância menor,
              pausando por um tempo antes da próxima tentativa.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Configuração padrão:</strong> Buraco de 20cm, sobe 5cm, cai 3cm, pausa 1s</li>
              <li><strong>Objetivo:</strong> Calcular quantas tentativas são necessárias para sair</li>
              <li><strong>Alertas:</strong> Quadro amarelo na metade, verde ao sair</li>
              <li><strong>Personalização:</strong> Configure todos os parâmetros como desejar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
