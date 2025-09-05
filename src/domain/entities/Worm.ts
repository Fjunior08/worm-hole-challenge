export interface Worm {
  position: number;
  attempts: number;
}

export interface Hole {
  depth: number;
  climbDistance: number;
  fallDistance: number;
  pauseTime: number;
}

export interface SimulationResult {
  success: boolean;
  attempts: number;
  finalPosition: number;
  reachedHalfway: boolean;
}
