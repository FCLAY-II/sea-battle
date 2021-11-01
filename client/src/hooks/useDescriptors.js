import { useDispatch, useSelector } from 'react-redux';
import gameAC from '../redux/actionCreators/gameAC';

function useDescriptors(socket) {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.game);

  return {
    makeTurn(cellId) {
      return {
        fetchCb: (accessToken) => fetch(`http://localhost:3001/api/games/${game.id}/make-turn/${cellId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }),
        onSuccess: (updatedEnemy) => {
          socket.send(JSON.stringify({ 
            type: 'MAKE_TURN',
            payload: { firstId: user.id, secondId: updatedEnemy.id }
          }));
        },
        onFailure: () => alert('сейчас не твой ход')
      };
    },

    loadGame(gameId) {
      return {
        fetchCb: (accessToken) => fetch(`http://localhost:3001/api/games/${gameId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }),
        onSuccess: (freshGame) => dispatch(gameAC.loadGameDelivery(freshGame)),
        onFailure: () => alert('ты не имеешь доступа к данной игре')
      };
    }
  };
}

export default useDescriptors;