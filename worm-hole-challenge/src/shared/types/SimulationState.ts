export type SimulationState = 'idle' | 'running' | 'completed';

export interface SimulationConfig {
  depth: number;
  climbDistance: number;
  fallDistance: number;
  pauseTime: number;
}
