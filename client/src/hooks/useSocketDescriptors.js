import { useDispatch, useSelector } from 'react-redux';

function useSocketDescriptors(socket) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return {
    makeTurn(gameId, cellId) {
      return {
        fetchCb: (accessToken) => fetch(`http://localhost:3001/api/games/${gameId}/make-turn/${cellId}`, {
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
    }
  };
}

export default useSocketDescriptors;