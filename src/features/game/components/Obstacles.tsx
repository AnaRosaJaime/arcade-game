import { useEffect, useRef, useState } from 'react';
import styles from './Obstacles.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context';

type Obstacle = {
  id: number;
  x: number;
  y: number;
};

export const Obstacles = () => {
  const { state, dispatch } = useGame();
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  const playerXRef = useRef(state.playerX);

  useEffect(() => {
    playerXRef.current = state.playerX;
  }, [state.playerX]);

  // Generate a new obstacle every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((obs) => [...obs, { id: Date.now(), x: Math.random() * 100, y: 0 }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Move obstacles downward every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((obs) =>
        obs
          .map((o) => ({ ...o, y: o.y + 1 }))
          .filter((o) => {
            // Simple collision check
            if (o.y > 90 && Math.abs(o.x - playerXRef.current) < 2) {
              dispatch({ type: 'COLLISION' });
              setTimeout(() => {
                dispatch({ type: 'END_COLLISION' });
              }, 400);
              return false;
            }
            return o.y < 100;
          })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <AnimatePresence>
        {obstacles.map((obs) => (
          <motion.div
            key={obs.id}
            className={styles.obstacle}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              top: `${obs.y}%`,
              left: `${obs.x}%`,
              position: 'absolute',
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};
