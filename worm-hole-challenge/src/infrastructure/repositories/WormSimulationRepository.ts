import { Hole, SimulationResult } from '../../domain/entities/Worm';
import { SimulationRepository } from '../../domain/repositories/SimulationRepository';

export interface SimulationProgress {
  position: number;
  attempts: number;
  reachedHalfway: boolean;
}

export class WormSimulationRepository implements SimulationRepository {
  private progressCallback?: (progress: SimulationProgress) => void;

  setProgressCallback(callback: (progress: SimulationProgress) => void) {
    this.progressCallback = callback;
  }

  async simulate(hole: Hole): Promise<SimulationResult> {
    return new Promise((resolve) => {
      let position = 0;
      let attempts = 0;
      let reachedHalfway = false;

      const emitProgress = () => {
        if (this.progressCallback) {
          this.progressCallback({
            position,
            attempts,
            reachedHalfway
          });
        }
      };

      const simulateStep = () => {
        attempts++;
        position += hole.climbDistance;
        
        // Emite progresso após subir
        emitProgress();
        
        // Verifica se chegou na metade
        if (!reachedHalfway && position >= hole.depth / 2) {
          reachedHalfway = true;
          emitProgress();
        }

        // Verifica se saiu do buraco
        if (position >= hole.depth) {
          resolve({
            success: true,
            attempts,
            finalPosition: position,
            reachedHalfway
          });
          return;
        }

        // A minhoca cai
        position -= hole.fallDistance;
        
        // Emite progresso após cair
        emitProgress();
        
        // Pausa antes da próxima tentativa
        setTimeout(simulateStep, hole.pauseTime * 1000);
      };

      simulateStep();
    });
  }
}
