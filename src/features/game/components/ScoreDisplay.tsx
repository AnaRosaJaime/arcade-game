import { useGame } from '../context';
import styles from './ScoreDisplay.module.css';

export const ScoreDisplay = () => {
  const { state } = useGame();

  return <div className={styles.score}>Score: {state.score}</div>;
};
