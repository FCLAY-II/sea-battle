import { createContext, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gameAC from '../redux/actionCreators/gameAC';
import userAC from '../redux/actionCreators/userAC';

async function wrapper(user, fetchCB, successCB, updateCredCB, logoutCB) {
  const response = await fetchCB(user.accessToken);
  if (response.ok) {
    const result = await response.json();
    successCB(result);
  } else if (response.status === 403) {
    const refResponse = await fetch('http://localhost:3001/api/tokens/refresh', {
      headers: { 'Authorization': `Bearer ${user.refreshToken}` }
    });
    if (refResponse.ok) {
      console.log('we\'re here');
      const { accessToken, refreshToken } = await refResponse.json();
      updateCredCB({ accessToken, refreshToken });
      // process the function again
      const secResponse = await fetchCB(accessToken);
      if (secResponse.ok) {
        const secResult = await secResponse.json();
        successCB(secResult);
      } else {
        alert('total failure');
      }
    } else {
      logoutCB();
    }
  } else {
    alert('с сервера пришёл неожиданный ответ');
  }
}

const SocketContext = createContext();

function SocketProvider({ children }) {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(`ws://localhost:3001/${user.id}`);

    socket.current.onopen = function(e) {

      console.log('opened');
  
      socket.current.onmessage = function(message) {
        const parsed = JSON.parse(message.data);
        console.log('message on front', parsed);
  
        switch (parsed.type) {
          case 'UPDATE_FIELD':
            dispatch(gameAC.loadGame());
            break;
          default:
            break;
        }
      };
    };

    return () => socket.current.close();
  }, [socket, user.id, dispatch]);
  
  function socketMakeTurn(gameId, cellId, postCb) {
  
    const fetchCb = (accessToken) => fetch(`http://localhost:3001/api/games/${gameId}/make-turn/${cellId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  
    const successCb = (updatedEnemy) => {
      postCb(updatedEnemy);
      socket.current.send(JSON.stringify({ 
        type: 'MAKE_TURN',
        payload: { firstId: user.id, secondId: updatedEnemy.id }
      }));
    };
  
    wrapper(user, fetchCb, successCb, ({ accessToken, refreshToken }) => dispatch(userAC.updateTokens({ accessToken, refreshToken })), () => {});
  }

  return (
    <SocketContext.Provider value={{ socket, socketMakeTurn }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
export const useSocket = () => useContext(SocketContext);
