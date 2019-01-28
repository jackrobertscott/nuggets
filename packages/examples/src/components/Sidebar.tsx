import React, { FunctionComponent, ReactElement } from 'react';
import { Frame } from 'nuggets';

export interface ISidebarProps {
  children: ReactElement<any> | Array<ReactElement<any>>;
}

export const Sidebar: FunctionComponent<ISidebarProps> = ({ children }) => {
  return (
    <Frame
      styles={{
        direction: 'east',
        grow: true,
        color: '#000000',
      }}
    >
      <Frame
        styles={{
          space: 20,
          between: 100,
          color: '#5700E3',
          gradient: {
            angle: 45,
            color: ['#000000', '#5700E3'],
          },
        }}
      >
        <Frame
          styles={{
            diameter: 30,
            color: 'white',
          }}
        />
        <Frame
          styles={{
            between: 10,
          }}
        >
          <Frame
            styles={{
              diameter: 30,
              color: 'white',
            }}
          />
          <Frame
            styles={{
              diameter: 30,
              color: 'white',
            }}
          />
          <Frame
            styles={{
              diameter: 30,
              color: 'white',
            }}
          />
        </Frame>
      </Frame>
      <Frame
        styles={{
          grow: true,
          gradient: {
            angle: -45,
            color: ['#000000', '#292431'],
          },
        }}
      >
        {children}
      </Frame>
    </Frame>
  );
};
