const uuid = require('uuid');

const SOCKET_EVENTS = {
  SUBSCRIBE_DATASOURCE_EVENT: 'SUBSCRIBE_DATASOURCE_EVENT',
  SYSTEM_NOTIFICATION_EVENT: 'SYSTEM_NOTIFICATION_EVENT',
  MARKETING_NOTIFICATION_EVENT: 'MARKETING_NOTIFICATION_EVENT'
};

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

module.exports = {
  SOCKET_EVENTS: SOCKET_EVENTS,
  getCurrentDateTime: getCurrentDateTime,
  notifications: notifications,
  getRandomNotification: getRandomNotification
};
