import * as React from 'react';

import { DEFAULT_SOCKET_URL, SOCKET_STATE } from './constants';
import { Observable } from './observable';
import { AnyFn, SocketEvent } from './types';

export const SocketContext = React.createContext({});

const noop = () => { /**/ };

interface Props {
  socket?: WebSocket;
  sockectURL?: string;
}

export interface SocketState {
  socketState: number;
  publish: AnyFn;
  subscribe: AnyFn;
  unSubscribe: AnyFn;
}

export class SocketProvider extends React.Component<Props, SocketState> {
  private socket: WebSocket | null;
  private observable: Observable | null;

  constructor(props: Props) {
    super(props);

    this.socket = null;
    this.observable = new Observable();

    this.state = {
      socketState: SOCKET_STATE.CLOSED,
      publish: noop,
      subscribe: this.observable.subscribe.bind(this.observable),
      unSubscribe: this.observable.unSubscribe.bind(this.observable)
    };
  }

  public componentDidMount() {
    this.createSocket();

    if (!this.socket) {
      return;
    }

    this.setState({
      socketState: this.socket.readyState
    }, this.onInitSocket);
  }

  public componentWillUnmount() {
    this.observable = null;

    if (!this.socket) {
      return;
    }

    this.socket.close();
  }

  public render() {
    return (
      <SocketContext.Provider value={this.state}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }

  private createSocket() {
    const { socket, sockectURL = DEFAULT_SOCKET_URL } = this.props;

    this.socket = socket || new WebSocket(sockectURL);
  }

  private onInitSocket() {
    if (!this.socket) {
      return;
    }

    this.setState({
      publish: this.publishToSocket
    });

    this.socket.onopen = (_event: Event) => {
      this.socket!.send('[onopen]: Hi, I am the Client');

      console.log('[onopen]: Client Connected');

      this.updateSocketState();
    };

    this.socket.onerror = (event: Event) => {
      console.error(`[onerror]: ${event}`);
    };

    this.socket.onclose = (event: CloseEvent) => {
      console.error(`[onclose]: ${event}`);

      this.updateSocketState();
    };

    this.socket.onmessage = (event) => {
      this.parseMessage(event);

      // const historyLog = event.data;
      // this.setState((prevState) => ({
      //   messageHistory: prevState.messageHistory.concat([historyLog])
      // }));
    };
  }

  private publishToSocket = (event: SocketEvent) => {
    if (!this.socket) {
      return;
    }

    this.socket.send(JSON.stringify(event));
  }

  private parseMessage(event: MessageEvent) {
    try {
      const eventData = JSON.parse(event.data);
      const { action = null } = eventData;

      if (action && this.observable) {
        this.observable.dispatch(action, eventData);
      }
    } catch (e) {
      console.log(e);
    }
  }

  private updateSocketState(): void {
    const socketState = !this.socket ? SOCKET_STATE.CLOSED : this.socket.readyState;

    this.setState({ socketState });
  }

  private getSocketState(): number {
    return this.state.socketState;
  }
}
