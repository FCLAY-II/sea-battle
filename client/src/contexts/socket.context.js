import { createContext, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSocketDescriptors from '../hooks/useSocketDescriptors';
import useSocketSender from '../hooks/useSocketSender';
import gameAC from '../redux/actionCreators/gameAC';
import userAC from '../redux/actionCreators/userAC';

const SocketContext = createContext();

function SocketProvider({ children }) {

  const user = useSelector((state) => state.user);
  const socket = useRef(new WebSocket(`ws://localhost:3001/${user.id}`));

  const dispatch = useDispatch();
  const socketSender = useSocketSender();
  const descriptors = useSocketDescriptors(socket.current);

  useEffect(() => {
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

  return (
    <SocketContext.Provider value={{ socket, socketSender, descriptors }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
export const useSocket = () => useContext(SocketContext);