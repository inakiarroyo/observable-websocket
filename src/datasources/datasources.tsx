import * as React from 'react';
import { v4 as uuid } from 'uuid';

import { DataSourcesMock, Styles } from '../types';
import { Datasource } from './datasource';

const styles: Styles = {
  wrapper: {
    display: 'flex'
  }
};

const dataSources: DataSourcesMock = [
  {
    title: 'Xero',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Xero_software_logo.svg/1200px-Xero_software_logo.svg.png'
  },
  {
    title: 'QuickBooks',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Intuit_QuickBooks_logo.png'
  }
];

export const Datasources = () => (
  <section>
    <h2>Data Sources</h2>

    <section style={styles.wrapper}>
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
  </section>
);
