const WebSocket = require('ws');
const uuid = require('uuid');

const SOCKET_EVENTS = {
  SUBSCRIBE_DATASOURCE_EVENT: 'SUBSCRIBE_DATASOURCE_EVENT',
  SYSTEM_NOTIFICATION_EVENT: 'SYSTEM_NOTIFICATION_EVENT',
  MARKETING_NOTIFICATION_EVENT: 'MARKETING_NOTIFICATION_EVENT'
}

const getCurrentDateTime = () => (new Date().toISOString());

const notifications = [
  {
    action: SOCKET_EVENTS.SYSTEM_NOTIFICATION_EVENT,
    data: {
      id: uuid.v4(),
      message: 'Hello from socket server!!',
      lastUpdated: getCurrentDateTime()
    }
  },
  {
    action: SOCKET_EVENTS.SYSTEM_NOTIFICATION_EVENT,
    data: {
      id: uuid.v4(),
      message: 'Hey, improve your user experience with our new UI!!',
      lastUpdated: getCurrentDateTime()
    }
  },
  {
    action: SOCKET_EVENTS.MARKETING_NOTIFICATION_EVENT,
    data: {
      id: uuid.v4(),
      message: 'Hey, reduce cost with our new plan!!',
      lastUpdated: getCurrentDateTime()
    }
  },
  {
    action: SOCKET_EVENTS.MARKETING_NOTIFICATION_EVENT,
    data: {
      id: uuid.v4(),
      message: 'Hey, have you seen our new offerts...??',
      lastUpdated: getCurrentDateTime()
    }
  }
];

const getRandomNotification = () => {
  const notification = notifications[Math.floor(Math.random() * notifications.length)];
  notification.data.lastUpdated = getCurrentDateTime();
  return notification;
};

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
            message: `[${getCurrentDateTime()}] The DataSource '${data.id}' has been connected!!`,
          }
        }));
      }, 500);

    } catch (e) {
      console.log('This does not look like a valid JSON: ', message);
      return;
    }
  });

  setInterval(() => {
    ws.send(JSON.stringify(getRandomNotification()));
  }, 5000);
});
