import { useReducer, type ReactNode } from 'react';
import { gameReducer, initialState } from './gameReducer';
import { GameContext } from './GameContext';

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};
