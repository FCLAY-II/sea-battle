import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameContextProvider from '../../contexts/game.context';
import { useSocket } from '../../contexts/socket.context';
import gameAC from '../../redux/actionCreators/gameAC';
import EnemyField from '../EnemyField/EnemyField';
import MyField from '../MyField/MyField';
import  './styles.css';

export default function Game() {
  const gameStatus = useSelector((state) => state.game.status);
  const { fetchSender, descriptors } = useSocket();
  const dispatch = useDispatch();

  const [surrender, setSurrender] = useState(false);

  useEffect(() => () => {
    if (gameStatus === 'finished') {
      dispatch(gameAC.setGame(null));
    }
  }, []);

  return (
    <GameContextProvider>
      <div className="game">
        {/* <h1>Ход игрока</h1> */}
        {gameStatus !== 'finished' ? (
          <button 
            type="button"
            onClick={() => {
              if (!surrender) {
                fetchSender(descriptors.finishGame());
                setSurrender(true);
              }
            }}
          >
            Сдаться
          </button>
        ) : (
          null
        )}
        <div className="fields">
          <MyField />
          {gameStatus === 'active' || gameStatus === 'finished' ? <EnemyField /> : <></>}
        </div>
        {gameStatus === 'finished' ? <button type="button" onClick={() => {
          dispatch(gameAC.setGame(null));
        }}>завершить игру</button> : <></>}
      </div>
    </GameContextProvider>
  );
}
