import * as React from 'react';

import { Omit } from '../types';
import { SocketContext, SocketState } from './socket-context';

export type InjectedWithSocketProps = SocketState;

export const withSocket = <P extends InjectedWithSocketProps>(
  Component: React.ComponentType<P>
): React.ComponentType<any> => (
  class WithSocket extends React.Component<Omit<InjectedWithSocketProps, P>> {
    public render() {
      return (
        <SocketContext.Consumer>
          {(injectedProps) => (
            <Component
              {...this.props as unknown as P}
              {...injectedProps}
            />
          )}
        </SocketContext.Consumer>
      );
    }
  }
);
