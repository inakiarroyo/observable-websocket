import * as React from 'react';
import { v4 as uuid } from 'uuid';

import { SOCKET_EVENTS } from '../socket/constants';
import { InjectedWithSocketProps, withSocket } from '../socket/socket-hoc';
import { NotificationEvent } from '../socket/types';
import { Styles } from '../types';

const styles: Styles = {
  wrapper: {
    border: '1px solid gray',
    borderRadius: '5px',
    height: '350px',
    maxWidth: '400px',
    padding: '10px',
    overflow: 'scroll'
  },
  odd: {
    backgroundColor: 'lightGray',
    padding: '5px'
  },
  even: {
    backgroundColor: 'white',
    padding: '5px'
  },
  counter: {
    fontWeight: 300,
    color: 'lightcoral',
    paddingLeft: '5px'
  }
};

type Props = InjectedWithSocketProps;

interface State {
  notificationHistory: NotificationEvent[];
}

export class NotificationsPanelBase extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      notificationHistory: []
    };
  }

  public componentDidMount() {
    this.props.subscribe(SOCKET_EVENTS.SYSTEM_NOTIFICATION_EVENT, this.onMessageReceived);
    this.props.subscribe(SOCKET_EVENTS.MARKETING_NOTIFICATION_EVENT, this.onMessageReceived);
  }

  public componentWillUnmount() {
    this.props.unSubscribe(SOCKET_EVENTS.SYSTEM_NOTIFICATION_EVENT, this.onMessageReceived);
    this.props.unSubscribe(SOCKET_EVENTS.MARKETING_NOTIFICATION_EVENT, this.onMessageReceived);
  }

  public render() {
    const { notificationHistory } = this.state;

    return (
      <React.Fragment>
        <h2>
          Notifications
          {notificationHistory && (<span style={styles.counter}>{notificationHistory.length}</span>)}
        </h2>

        <section style={styles.wrapper}>
          {
            notificationHistory.map((notification: NotificationEvent, index: number) => {
              const typeRow = index % 2 === 0 ? 'even' : 'odd'; // tslint:disable-line:no-magic-numbers
              const { action, data: { message, lastUpdated } } = notification;

              return (
                <div key={uuid()} style={styles[typeRow]}>
                  <p>Action: {action}</p>
                  <p>Message: {message}</p>
                  <p>Last Updated: {lastUpdated}</p>
                </div>
              );
            })
          }
        </section>
      </React.Fragment>
    );
  }

  private onMessageReceived = (eventData: NotificationEvent) => {
    this.setState((prevState) => ({
      notificationHistory: (prevState.notificationHistory.reverse().concat(eventData)).reverse()
    }));
  }
}

export const NotificationsPanel = withSocket(NotificationsPanelBase);
