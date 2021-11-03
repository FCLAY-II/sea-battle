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

  const initUserId = +request.url.slice(request.url.lastIndexOf('/') + 1);
  usersConnetctions.set(initUserId, ws);

  ws.on('message', async (message) => {
    const parsed = JSON.parse(message);
    console.log('message on back:', parsed);

    switch (parsed.type) {
      case 'MAKE_TURN':
        [parsed.payload.firstId, parsed.payload.secondId].forEach((id) => {
          const client = usersConnetctions.get(id);
          if (client?.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'UPDATE_FIELD',
            }));
          }
        });
        break;
      case 'PUT_SHIPS':
        [parsed.payload.enemyId].forEach((id) => {
          const client = usersConnetctions.get(id);
          if (client?.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'ENEMY_READY',
            }));
          }
        });
        break;
      case 'GAME_CREATED':
        [parsed.payload.firstId, parsed.payload.secondId].forEach((id) => {
          const client = usersConnetctions.get(id);
          if (client?.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'GO_TO_GAME',
              payload: parsed.payload.gameId,
            }));
          }
        });
        break;
      case 'INVITE_CREATED':
        [parsed.payload.hosttId].forEach((id) => {
          const client = usersConnetctions.get(id);
          if (client?.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'INVITE_SENDED',
            }));
          }
        });
        [parsed.payload.guestId].forEach((id) => {
          const client = usersConnetctions.get(id);
          if (client?.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'YOU_HAVE_NEW_INVITE',
            }));
          }
        });
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
