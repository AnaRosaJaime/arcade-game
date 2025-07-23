import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { GameProvider, Game } from '../features/game';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GameProvider>
              <Outlet />
            </GameProvider>
          }
        >
          <Route index element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
