import React from 'react';
import type { GameContextType } from './types';
import { initialState } from './gameReducer';

export const GameContext = React.createContext<GameContextType>({
  state: initialState,
  dispatch: () => null,
});
