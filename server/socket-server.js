const WebSocket = require('ws');
const utils = require('./utils');

const SOCKET_PORT = 3000;

const wss = new WebSocket.Server({ port: SOCKET_PORT });

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    try {
      const { action, data } = JSON.parse(message);

      // Emulating lambda datasource connection process
      if (action === utils.SOCKET_EVENTS.SUBSCRIBE_DATASOURCE_EVENT) {
        setTimeout(() => {
          ws.send(JSON.stringify({
            action,
            data: {
              id: data.id,
              message: `[${utils.getCurrentDateTime()}] The DataSource '${data.id}' has been connected!!`,
            }
          }));
        }, 500);
      }
    } catch (e) {
      console.log('This does not look like a valid JSON: ', message);
      return;
    }
  });

  setInterval(() => {
    ws.send(JSON.stringify(utils.getRandomNotification()));
  }, 5000, true);
});
