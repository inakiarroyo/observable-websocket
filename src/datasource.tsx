import * as React from 'react';
import withStyles from 'react-jss';
import { v4 as uuid } from 'uuid';

import { SOCKET_EVENTS, SOCKET_STATE } from './socket/constants';
import { InjectedWithSocketProps, withSocket } from './socket/socket-hoc';

const styles = {
  wrapper: {
    border: '1px solid gray',
    borderRadius: '5px',
    minHeight: '100px',
    maxWidth: '300px',
    margin: '10px',
    padding: '10px'
  },
  messageWrapper: {
    backgroundColor: 'lightGray',
    padding: '5px',
    marginTop: '10px'
  }
};

interface OwnProps {
  // classes: any;
  title: string;
  image: string;
}

type Props = OwnProps & InjectedWithSocketProps;

interface State {
  message: string;
  error: string;
  connectedCount: number;
}

export class DatasourceBase extends React.Component<Props, State> {

  private datasourceId = uuid();
  // private connectDatasource: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      message: '',
      error: '',
      connectedCount: 0
    };

    // this.connectDatasource = connectDatasource(props.socket!).bind(this, this.datasourceId);
  }

  public componentDidMount() {
    this.props.subscribe(SOCKET_EVENTS.SUBSCRIBE_DATASOURCE_EVENT, this.onMessageReceived);

    // this.connectDatasource = connectDatasource(this.props.socket!).bind(this, this.datasourceId);
  }

  public componentWillUnmount() {
    this.props.unSubscribe(SOCKET_EVENTS.SUBSCRIBE_DATASOURCE_EVENT, this.onMessageReceived);
  }

  public render() {
    // const { classes } = this.props;
    const { title, image, socketState } = this.props;
    const { message, connectedCount } = this.state;

    return (
      // <section className={classes.wrapper}>
      <section style={styles.wrapper}>
        <h2>{title}</h2>

        <img src={image} alt="" height="50px" />

        <p>Times connected: {connectedCount}</p>
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

  private onMessageReceived = (eventData: any) => {
    const { action, data: { id, message } } = eventData;

    if (id !== this.datasourceId) {
      return;
    }

    this.setState((prevState) => ({
      message,
      connectedCount: action === SOCKET_EVENTS.SUBSCRIBE_DATASOURCE_EVENT
        ? prevState.connectedCount + 1
        : prevState.connectedCount
    }));
  }
}

export const Datasource = withSocket(DatasourceBase);

// export const Datasource = withStyles(styles)(DatasourceWS);
