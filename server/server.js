require('dotenv').config();

const { createServer } = require('http');
const WebSocket = require('ws');
const { app } = require('./app');

const PORT = process.env.PORT ?? 3001;

const server = createServer(app);

const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

const usersConnetctions = new Map();

function parseToken(url) {
  const queries = url.slice(url.indexOf('?') + 1);
  const obj = queries.split('&').reduce((result, query) => {
    const [key, value] = query.split('=');
    result[key] = value;
    return result;
  }, {});

  return obj._token;
}

server.on('upgrade', async (request, socket, head) => {
  const token = parseToken(request.url);
  const res = await fetch('http:localhost:3002/');
  console.log(res.status);
  console.log('Parsing session from request...');
});

wss.on('connection', (ws, request) => {
  console.log(request.url);

  // ...

  ws.on('message', async (message) => {
    const parsed = JSON.parse(message);

    // message: { type, payload }
    switch (parsed.type) {
      case 'NEW_MESSAGE':
        console.log('message on back', parsed);
        // let userId = await User.findOne()
        usersConnetctions.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: parsed.type,
                payload: { name: userName, message: parsed.payload },
              }),
            );
          }
        });
        break;
      case 'CHAT_CONNECT':
        usersConnetctions.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: parsed.type,
                payload: userName,
              }),
            );
          }
        });
        break;

      default:
        break;
    }
  });

  ws.on('close', () => {
    usersConnetctions.delete(userId);
  });
});

server.listen(PORT, () => console.log('WebSockets dobro on port:', PORT));
