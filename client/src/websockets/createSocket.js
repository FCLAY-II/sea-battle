function createSocket() {

  console.log('called');

  const socket = new WebSocket('ws://localhost:3001/');

  console.log(socket);

  socket.onopen = function (e) {

    console.log('opened');

    socket.onmessage = function(message) {
      const parsed = JSON.parse(message.data);
      console.log('message on front', parsed);
    };
  };

  return socket;
}

export default createSocket;