import { Hole, SimulationResult } from '../../domain/entities/Worm';
import { SimulationRepository } from '../../domain/repositories/SimulationRepository';

export class SimulateWormMovement {
  constructor(private simulationRepository: SimulationRepository) {}

  async execute(hole: Hole): Promise<SimulationResult> {
    return this.simulationRepository.simulate(hole);
  }
}
