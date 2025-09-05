import { Hole, SimulationResult } from '../entities/Worm';

export interface SimulationRepository {
  simulate(hole: Hole): Promise<SimulationResult>;
}
