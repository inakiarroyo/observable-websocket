export interface SocketEvent {
  action: string;
  data: {
    [key: string]: any;
  };
}
