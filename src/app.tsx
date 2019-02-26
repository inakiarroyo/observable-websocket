import * as React from 'react';
import { v4 as uuid } from 'uuid';

import { Datasource } from './datasource';
import { SocketProvider } from './socket/socket-context';
import { DataSources } from './types';

interface State {
  messageHistory: string[];
}

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

export class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      messageHistory: []
    };
  }

  public render() {
    const { messageHistory } = this.state;

    return (
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

        <div>
          <h2>Message History</h2>
          {messageHistory.map((message, index) => (<p key={index}>{message}</p>))}
        </div>

      </SocketProvider>
    );
  }
}
