import type { GameAction, GameState } from './types';

export const initialState: GameState = {
  score: 0,
  lives: 3,
  status: 'idle',
  playerX: 50, // Initial horizontal position of the player
  isColliding: false,
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, status: 'playing', score: 0, lives: 3 };
    case 'INCREMENT_SCORE':
      return { ...state, score: state.score + 1 };
    case 'MOVE_PLAYER':
      return { ...state, playerX: action.payload };
    case 'COLLISION': {
      const newLives = state.lives - 1;
      const isGameOver = newLives <= 0;
      return {
        ...state,
        lives: newLives,
        isColliding: true,
        status: isGameOver ? 'gameover' : 'playing',
      };
    }
    case 'END_COLLISION':
      return { ...state, isColliding: false };
    default:
      return state;
  }
};
