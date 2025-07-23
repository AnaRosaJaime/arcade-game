export type GameStatus = 'idle' | 'playing' | 'gameover';

export interface GameState {
  score: number;
  lives: number;
  status: GameStatus;
  playerX: number;
  isColliding: boolean;
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'INCREMENT_SCORE' }
  | { type: 'MOVE_PLAYER'; payload: number }
  | { type: 'COLLISION' }
  | { type: 'END_COLLISION' };

export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}
