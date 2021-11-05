import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameContextProvider from '../../contexts/game.context';
import { useSocket } from '../../contexts/socket.context';
import gameAC from '../../redux/actionCreators/gameAC';
import EnemyField from '../EnemyField/EnemyField';
import MyField from '../MyField/MyField';
import Ships from '../ShipsContainer/ShipsContainer';
import styles from './styles.css';
import SurrenderButton from './SurrenderButton/SurrenderButton';

export default function Game() {
  const user = useSelector((state) => state.user);
  const gameStatus = useSelector((state) => state.game.status);
  const game = useSelector((state) => state.game);
  const { fetchSender, descriptors } = useSocket();
  const dispatch = useDispatch();

  const [surrender, setSurrender] = useState(false);
  const [ships, setShips] = useState([[4], [3, 3], [2, 2, 2], [1, 1, 1, 1]]);

  useEffect(() => () => {
    if (gameStatus === 'finished') {
      dispatch(gameAC.setGame(null));
    }
  }, []);

  function giveInformation(gamestatus) {
    if (gamestatus === 'active') {
      return (
        <div>
          {game.currentPlayerId === user.id ? (
            <p className='game-info'>Cейчас ваш ход</p>
          ) : (
            <p className='game-info'>Ждём, пока сходит {game.enemy.login}</p>
          )}
        </div>
      );
    }
    if (gamestatus === 'finished') {
      return (
        <div>
          {game.currentPlayerId === user.id ? (
            <p className='win'>Вы выиграли!</p>
          ) : (
            <p> Победил {game.enemy.login}</p>
          )}
        </div>
      );
    }
    return null;
  }

  return (
    <GameContextProvider>
      <div style={{width: '100%'}}>
        {giveInformation(gameStatus)}
        {gameStatus !== 'finished' ? (
          <SurrenderButton surrender={surrender} setSurrender={setSurrender} />
        ) : null}
        <div className="fields">
          <MyField />
          {gameStatus === 'active' || gameStatus === 'finished' ? (
            <EnemyField />
          ) : (
            // {game.status === 'preparation' ? (
              <>
                <Ships ships={ships} setShips={setShips} />
              </>
            // ) : null}
          )}
        </div>
        {gameStatus === 'finished' ? (
          <button
            className="btnInvite
            btn
            btn-outline-primary
            btn-lg"
            type="button"
            onClick={() => {
              dispatch(gameAC.setGame(null));
            }}
          >
            Завершить игру
          </button>
        ) : (
          <></>
        )}
        {gameStatus === 'preparation' ? (
            <button
            className="btnInvite
              btn
              btn-outline-primary
              btn-sm"
            type="button"
            onClick={() => {
              fetchSender(descriptors.confirmShips(game.field));
              // setButtonState('unvisible');
            }}
          >
            Готов к игре
          </button>
        ) : (
          null
        )}
      </div>
    </GameContextProvider>
  );
}
