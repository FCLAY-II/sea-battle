import { createContext, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRequestDescriptors from '../hooks/useDescriptors';
import useFetchSender from '../hooks/useFetchSender';

const SocketContext = createContext();

function SocketProvider({ children }) {
  const user = useSelector((state) => state.user);
  const socket = useRef(null);

  const dispatch = useDispatch();
  const fetchSender = useFetchSender();
  const descriptors = useRequestDescriptors(socket.current);

  useEffect(() => {
    socket.current = new WebSocket(`ws://localhost:3001/${user.id}`);

    socket.current.onopen = () => {
      console.log('opened');

      socket.current.onmessage = (message) => {
        const parsed = JSON.parse(message.data);
        console.log('message on front', parsed);

        switch (parsed.type) {
          case 'UPDATE_FIELD':
            fetchSender(descriptors.loadGame(1));
            break;
          default:
            break;
        }
      };
    };

    return () => socket.current.close();
  }, [socket, user.id, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, fetchSender, descriptors }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
export const useSocket = () => useContext(SocketContext);
