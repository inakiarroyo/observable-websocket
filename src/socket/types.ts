export interface SocketEvent {
  action: string;
  data: {
    [key: string]: any;
  };
}

export interface NotificationEvent extends SocketEvent {
  data: {
    id: string;
    message: string;
    lastUpdated: string;
  };
}
