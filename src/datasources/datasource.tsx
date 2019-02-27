import * as React from 'react';
import { v4 as uuid } from 'uuid';

import { SOCKET_EVENTS, SOCKET_STATE } from '../socket/constants';
import { InjectedWithSocketProps, withSocket } from '../socket/socket-hoc';
import { SocketEvent } from '../socket/types';
import { Styles } from '../types';

const styles: Styles = {
  wrapper: {
    border: '1px solid gray',
    borderRadius: '5px',
    minHeight: '100px',
    maxWidth: '300px',
    padding: '10px',
    marginRight: '5px'
  },
  messageWrapper: {
    backgroundColor: '#e91e632e',
    padding: '5px',
    marginTop: '10px'
  },
  size: {
    height: '50px'
  },
  counter: {
    fontWeight: 300,
    color: 'lightcoral'
  }
};

interface OwnProps {
  title: string;
  image: string;
}

type Props = OwnProps & InjectedWithSocketProps;

interface State {
  message: string;
  error: string;
  socketResponseCount: number;
}

export class DatasourceBase extends React.Component<Props, State> {

  private datasourceId = uuid();

  constructor(props: Props) {
    super(props);

    this.state = {
      message: '',
      error: '',
      socketResponseCount: 0
    };
  }

  public componentDidMount() {
    this.props.subscribe(SOCKET_EVENTS.SUBSCRIBE_DATASOURCE_EVENT, this.onMessageReceived);
  }

  public componentWillUnmount() {
    this.props.unSubscribe(SOCKET_EVENTS.SUBSCRIBE_DATASOURCE_EVENT, this.onMessageReceived);
  }

  public render() {
    const { title, image, socketState } = this.props;
    const { message, socketResponseCount } = this.state;

    return (
      <section style={styles.wrapper}>
        <h2>{title}</h2>

        <img src={image} alt="datasource logo" style={styles.size} />

        <p>Socket server responses: <span style={styles.counter}>{socketResponseCount}</span></p>
        <p>DatasourceId: {this.datasourceId}</p>

        <button
          onClick={this.handleConnectClick}
          disabled={socketState !== SOCKET_STATE.OPEN}
        >
          Connect Datasource
        </button>

        {message && <div style={styles.messageWrapper}>{message}</div>}
      </section>
    );
  }

  private handleConnectClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    this.props.publish({
      action: SOCKET_EVENTS.SUBSCRIBE_DATASOURCE_EVENT,
      data: { id: this.datasourceId }
    });
  }

  private onMessageReceived = (eventData: SocketEvent) => {
    const { data: { id, message } } = eventData;

    if (id !== this.datasourceId) {
      return;
    }

    this.setState((prevState) => ({
      message,
      socketResponseCount: prevState.socketResponseCount + 1
    }));
  }
}

export const Datasource = withSocket(DatasourceBase);
