import styles from './LivesBar.module.css';
import { useGame } from '../context';

export const LivesBar = () => {
  const { state } = useGame();

  return (
    <div className={styles.livesContainer}>
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className={`${styles.heart} ${i < state.lives ? styles.full : styles.empty}`}
        />
      ))}
    </div>
  );
};
