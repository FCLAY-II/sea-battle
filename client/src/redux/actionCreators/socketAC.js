import { CLOSE_SOCKET, CREATE_SOCKET } from '../types/socket.types';

const socketAC = {
  createSocket: () => ({
    type: CREATE_SOCKET,
    payload: new WebSocket.Server({ clientTracking: false, noServer: true })
  }),

  closeSocket: () => ({
    type: CLOSE_SOCKET,
  })
};

export default socketAC;