const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    try {
      const { action, data } = JSON.parse(message);

      console.log(action, data);

      setTimeout(() => {
        ws.send(JSON.stringify({
          action,
          data: {
            id: data.id,
            message: `The DataSource '${data.id}' has been connected!!`
          }
        }));
      }, 500);

    } catch (e) {
      console.log('This does not look like a valid JSON: ', message);
      return;
    }
  });

  setInterval(() => {
    ws.send(JSON.stringify({
      action: 'INVALID_DATASOURCE_EVENT',
      data: {
        message: 'Hello from Socket Server, this message should appear JUST in the Message History!!'
      }
    }));
  }, 30000);

  ws.send('Hello from Socket Server!!');
});
