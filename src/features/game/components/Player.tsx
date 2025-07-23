import { useEffect } from 'react';
import styles from './Player.module.css';
import { motion } from 'framer-motion';
import { useGame } from '../context';

export const Player = () => {
  const { state, dispatch } = useGame();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        dispatch({ type: 'MOVE_PLAYER', payload: Math.max(0, state.playerX - 2) });
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        dispatch({ type: 'MOVE_PLAYER', payload: Math.min(100, state.playerX + 2) });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, state.playerX]);

  // For mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const parent = e.currentTarget.parentElement?.getBoundingClientRect();

    if (parent) {
      const relativeX = ((touch.clientX - parent.left) / parent.width) * 100;
      dispatch({
        type: 'MOVE_PLAYER',
        payload: Math.max(0, Math.min(relativeX, 100)),
      });
    }
  };

  return (
    <motion.div
      className={styles.player}
      animate={{
        left: `${state.playerX}%`,
        x: '-50%',
        scale: state.isColliding ? 1.2 : 1,
      }}
      transition={{
        left: { type: 'spring', stiffness: 300, damping: 20 },
        scale: { type: 'spring', stiffness: 300, damping: 10 },
      }}
      style={{
        position: 'absolute',
        bottom: '10px',
      }}
      onTouchMove={handleTouchMove}
    />
  );
};
