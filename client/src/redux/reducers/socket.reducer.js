import { CLOSE_SOCKET, CREATE_SOCKET } from '../types/socket.types';

function socketReducer(socket = null, action) {
  switch (action.type) {
    case CREATE_SOCKET:
      return action.payload;
    case CLOSE_SOCKET:
      socket.close();
      return null;
    default:
      return socket;
  };
}

export default socketReducer;