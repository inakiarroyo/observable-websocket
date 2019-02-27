import * as React from 'react';

import { Datasources } from './datasources/datasources';
import { NotificationsPanel } from './notifications/notifications-panel';
import { SocketProvider } from './socket/socket-context';
import { Styles } from './types';

const styles: Styles = {
  wrapper: {
    margin: '10px'
  }
};

const refreshPage = () => {
  window.location.reload();
};

export const App = () => (
  <SocketProvider>
    <section style={styles.wrapper}>

      <strong>
        If you re-connect the Socket then
        <button type="button" onClick={refreshPage}>
          Reload
        </button>
      </strong>

      <Datasources />
      <NotificationsPanel />
    </section>
  </SocketProvider>
);
