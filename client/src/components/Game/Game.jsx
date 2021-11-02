import { useSelector } from 'react-redux';
import EnemyField from '../EnemyField/EnemyField';
import MyField from '../MyField/MyField';

export default function Game() {
  const gameStatus = useSelector((state) => state.game.status);

  return (
    <div className="game">
      <MyField />
      {gameStatus === 'active' ? <EnemyField /> : <></>}
    </div>
  );
}
