import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useDescriptors from '../hooks/useDescriptors';
import useFetchSender from '../hooks/useFetchSender';
import gameAC from '../redux/actionCreators/gameAC';
import userAC from '../redux/actionCreators/userAC';

const SocketContext = createContext();

function SocketProvider({ children }) {
  const gameId = useRef(null);
  const socket = useRef(null);

  gameId.current = useSelector((state) => state.game?.id);
  const user = useSelector((state) => state.user);
  const [modalShowed, setModalShowed] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const fetchSender = useFetchSender();
  const descriptors = useDescriptors(socket);

  console.log('socket context rendered', gameId);

  useEffect(() => {
    socket.current = new WebSocket(`ws://localhost:3001/${user.id}`);

    socket.current.onopen = () => {
      console.log('opened');

      socket.current.onmessage = (message) => {
        const parsed = JSON.parse(message.data);
        console.log('message on front', parsed);

        switch (parsed.type) {
          case 'UPDATE_FIELD':
            fetchSender(descriptors.loadGame(gameId.current));
            break;
          case 'ENEMY_READY':
            // alert('enemy ready');
            dispatch(gameAC.changeStatus('awaiting'));
            break;
          case 'GO_TO_GAME':
            fetchSender(descriptors.loadGame(parsed.payload));
            history.push('/play');
            break;
          case 'INVITE_SENDED':
            dispatch(userAC.addSentInvite());
            break;
          case 'YOU_HAVE_NEW_INVITE':
            setModalShowed(true);
            dispatch(userAC.addReceivedInvite());
            break;
          case 'REMOVE_SENT_INVITE':
            dispatch(userAC.removeSentInvite());
            break;
          case 'REMOVE_RECEIVED_INVITE':
            dispatch(userAC.removeReceivedInvite());
            break;
          default:
            break;
        }
      };
    };

    return () => socket.current.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, modalShowed, setModalShowed, fetchSender, descriptors }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
export const useSocket = () => useContext(SocketContext);
