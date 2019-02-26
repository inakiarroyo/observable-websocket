import * as React from 'react';
import { v4 as uuid } from 'uuid';

import { Datasource } from './datasource';
import { NotificationsPanel } from './notifications/notifications-panel';
import { SocketProvider } from './socket/socket-context';
import { DataSources } from './types';

const dataSources: DataSources = [
  {
    title: 'Xero',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Xero_software_logo.svg/1200px-Xero_software_logo.svg.png'
  },
  {
    title: 'QuickBooks',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Intuit_QuickBooks_logo.png'
  }
];

export const App = () => (
  <SocketProvider>
    <section style={{display: 'flex'}}>
      {
        dataSources.map((dataSource) => (
          <Datasource
            key={uuid()}
            title={dataSource.title}
            image={dataSource.image}
          />
        ))
      }
    </section>

    <NotificationsPanel />

  </SocketProvider>
);
