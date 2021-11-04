import { useDispatch, useSelector } from 'react-redux';
import gameAC from '../redux/actionCreators/gameAC';
import userAC from '../redux/actionCreators/userAC';
import useFetchSender from './useFetchSender';

function useDescriptors(socket) {
  const dispatch = useDispatch();
  const fetchSender = useFetchSender();

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
          socket.current.send(
            JSON.stringify({
              type: 'MAKE_TURN',
              payload: { firstId: user.id, secondId: updatedEnemy.id },
            })
          );
        },
        onFailure: () => alert('сейчас не твой ход'),
      };
    },

    loadGame(gameId) {
      console.log('loadGame called');
      // alert(`gameId form loadGame: ${gameId}`);
      return {
        fetchCb: (accessToken) =>
          fetch(`http://localhost:3001/api/games/${gameId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        onSuccess: (freshGame) => dispatch(gameAC.setGame(freshGame)),
        onFailure: () => alert('ты не имеешь доступа к данной игре'),
      };
    },

    allUsers(setPlayers, search) {
      return {
        fetchCb: (accessToken) =>
          fetch(`http://localhost:3001/api/profile/users/?_search=${search}`, {
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
        fetchCb: (accessToken) =>
          fetch(`http://localhost:3001/api/games/${game.id}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ myField }),
          }),
        onSuccess: ({ status, enemyId }) => {
          if (status === 'active') {
            socket.current.send(
              JSON.stringify({
                type: 'MAKE_TURN',
                payload: { firstId: user.id, secondId: enemyId },
              })
            );
          } else {
            dispatch(gameAC.changeStatus('pending'));
            socket.current.send(JSON.stringify({
              type: 'PUT_SHIPS',
              payload: { enemyId }
            }));
          }
        },
        onFailure: () => alert('неправильная расстановка кораблей'),
      };
    },

    createGame(enemyId) {
      return {
        fetchCb: (accessToken) =>
          fetch('http://localhost:3001/api/games/new', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playerId: enemyId }),
          }),
        onSuccess: ({ gameId }) => {
          socket.current.send(
            JSON.stringify({
              type: 'GAME_CREATED',
              payload: { firstId: user.id, secondId: enemyId, gameId },
            })
          );
        },
        onFailure: () => alert('неправильная расстановка кораблей'),
      };
    },

    finishGame() {
      return {
        fetchCb: (accessToken) => 
          fetch(`http://localhost:3001/api/games/${game.id}/finish`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          }),
        onSuccess: ({ winnerId }) => {
          socket.current.send(
            JSON.stringify({
              type: 'FINISH_GAME',
              payload: { loserId: user.id, winnerId },
            })
          );
        },
        onFailure: () => alert('не удалось завершить игру'),
      };
    },

    createInvitation(guestId) {
      console.log('loadGame called');
      return {
        fetchCb: (accessToken) =>
          fetch('http://localhost:3001/api/invite/new', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guestId }),
          }),
        onSuccess: () => {
          socket.current.send(
            JSON.stringify({
              type: 'INVITE_CREATED',
              payload: { hostId: user.id, guestId },
            })
          );
        },
        onFailure: () => alert('не получилось отправить приглашение'),
      };
    },

    confirmInvitation(inviteId) {
      console.log('confirmInvitation called');
      return {
        fetchCb: (accessToken) =>
          fetch(`http://localhost:3001/api/invite/${inviteId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        onSuccess: ({ hostId }) => fetchSender(this.createGame(hostId)),
        onFailure: () => alert('не получилось принять приглашение'),
      };
    },

    deleteInvitation(inviteId) {
      console.log('confirmInvitation called');
      return {
        fetchCb: (accessToken) =>
          fetch(`http://localhost:3001/api/invite/${inviteId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        onSuccess: ({ hostId, guestId }) => {
          socket.current.send(
            JSON.stringify({
              type: 'INVITE_CANCELED',
              payload: { hostId, guestId },
            })
          );
        },
        onFailure: () => alert('не получилось отменить приглашение'),
      };
    },

    getReceivedInvites(setInvites) {
      return {
        fetchCb: (accessToken) =>
          fetch('http://localhost:3001/api/invite/received', {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        onSuccess: ({ allInvites }) => setInvites(allInvites),
        onFailure: () => alert('не удалось получить приглашения'),
      };
    },

    getSentInvites(setInvites) {
      return {
        fetchCb: (accessToken) =>
          fetch('http://localhost:3001/api/invite/sent', {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        onSuccess: ({ allInvites }) => {
          setInvites(allInvites);
          userAC.addSentInvite();
        },
        onFailure: () => alert('не удалось получить приглашения'),
      };
    },

    getStatistic(setStatistic) {
      return {
        fetchCb: (accessToken) =>
          fetch(`http://localhost:3001/api/profile/${user.id}/statistic`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        onSuccess: ({ gamesCount, victoriesCount, failCount }) =>
          setStatistic({ gamesCount, victoriesCount, failCount }),
        onFailure: () => console.log('не удалось получить статистику')
      };
    },
  };
}

export default useDescriptors;
