require('dotenv').config();

const { createServer } = require('http');
const WebSocket = require('ws');
const { app } = require('./app');

const PORT = process.env.PORT ?? 3001;

const server = createServer(app);

const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

const usersConnetctions = new Map();

server.on('upgrade', async (request, socket, head) => {
  console.log('upgrade happened');

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws, request) => {
  console.log('connection happened', request.url);

  usersConnetctions.set
  // ...

  ws.on('message', async (message) => {
    const parsed = JSON.parse(message);

    switch (parsed.type) {
      case 'PING':
        console.log('PONG');
        break;
      default:
        break;
    }

    // message: { type, payload }
    // switch (parsed.type) {
    //   case 'NEW_MESSAGE':
    //     console.log('message on back', parsed);
    //     // let userId = await User.findOne()
    //     usersConnetctions.forEach((client) => {
    //       if (client.readyState === WebSocket.OPEN) {
    //         client.send(
    //           JSON.stringify({
    //             type: parsed.type,
    //             payload: { name: userName, message: parsed.payload },
    //           }),
    //         );
    //       }
    //     });
    //     break;
    //   case 'CHAT_CONNECT':
    //     usersConnetctions.forEach((client) => {
    //       if (client.readyState === WebSocket.OPEN) {
    //         client.send(
    //           JSON.stringify({
    //             type: parsed.type,
    //             payload: userName,
    //           }),
    //         );
    //       }
    //     });
    //     break;

    //   default:
    //     break;
    // }
  });

  ws.on('close', () => {
    console.log('close happened');
    // usersConnetctions.delete(userId);
  });
});

server.listen(PORT, () => console.log('WebSockets dobro on port:', PORT));
