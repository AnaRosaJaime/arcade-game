import { motion } from 'framer-motion';
import { LivesBar, Obstacles, Player, ScoreDisplay } from './components';

import styles from './Game.module.css';
import { useEffect } from 'react';
import { useGame } from './context';

export const Game = () => {
  const { state, dispatch } = useGame();

  useEffect(() => {
    if (state.status !== 'playing') return;

    const interval = setInterval(() => {
      dispatch({ type: 'INCREMENT_SCORE' });
    }, 5000);

    return () => clearInterval(interval);
  }, [state.status, dispatch]);

  if (state.status === 'playing') {
    return (
      <div className={styles.container}>
        <LivesBar />
        <ScoreDisplay />
        <motion.div
          className={styles.gameArea}
          animate={{
            x: state.isColliding ? [0, -10, 10, -10, 10, 0] : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <Player />
          <Obstacles />
        </motion.div>
      </div>
    );
  }

  if (state.status === 'gameover')
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Game Over</h1>
        <button className={styles.button} onClick={() => dispatch({ type: 'START_GAME' })}>
          Restart Game
        </button>
      </div>
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Arcade Hero</h1>
      <button className={styles.button} onClick={() => dispatch({ type: 'START_GAME' })}>
        Start Game
      </button>
    </div>
  );
};
