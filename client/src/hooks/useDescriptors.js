import { useDispatch, useSelector } from 'react-redux';
import gameAC from '../redux/actionCreators/gameAC';

function useDescriptors(socket) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.game);

  return {
    makeTurn(cellId) {
      return {
        fetchCb: (accessToken) =>
          fetch(
            `http://localhost:3001/api/games/${game.id}/make-turn/${cellId}`,
            {
              method: 'PATCH',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          ),
        onSuccess: (updatedEnemy) => {
          socket.current.send(JSON.stringify({
            type: 'MAKE_TURN',
            payload: { firstId: user.id, secondId: updatedEnemy.id }
          }));
        },
        onFailure: () => alert('сейчас не твой ход'),
      };
    },

    loadGame(gameId) {
      return {
        fetchCb: (accessToken) =>
          fetch(`http://localhost:3001/api/games/${gameId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        onSuccess: (freshGame) => dispatch(gameAC.loadGameDelivery(freshGame)),
        onFailure: () => alert('ты не имеешь доступа к данной игре'),
      };
    },

    allUsers(setPlayers) {
      return {
        fetchCb: (accessToken) =>
          fetch('http://localhost:3001/api/profile/users', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        onSuccess: (usersFromBack) => setPlayers(usersFromBack),
        onFailure: () => alert('Игроки остались на сервере'),
      };
    },

    confirmShips(myField) {
      return {
        fetchCb: (accessToken) => fetch(`http://localhost:3001/api/games/${game.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ myField })
        }),
        onSuccess: ({status, enemyId}) => {
          if (status === 'active'){
          socket.current.send(JSON.stringify({
            type: 'MAKE_TURN',
            payload: { firstId: user.id, secondId: enemyId }
          }));} else {
            socket.current.send(JSON.stringify({
              type: 'PUT_SHIPS',
              payload: { enemyId }
            }));
          }
        },
        onFailure: () => alert('неправильная расстановка кораблей')
      };
    },

    createGame(enemyId) {
      return {
        fetchCb: (accessToken) => fetch('http://localhost:3001/api/games/new', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ playerId: enemyId })
        }),
        onSuccess: ({ gameId }) => {
          socket.current.send(JSON.stringify({
            type: 'GAME_CREATED',
            payload: { firstId: user.id, secondId: enemyId, gameId }
          }));
        },
        onFailure: () => alert('неправильная расстановка кораблей')
      };
    }
  };
}

export default useDescriptors;
