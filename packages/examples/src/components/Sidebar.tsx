import React, { FunctionComponent, ReactElement } from 'react';
import { Piece } from 'nuggets';

export interface ISidebarProps {
  children: ReactElement<any> | Array<ReactElement<any>>;
}

export const Sidebar: FunctionComponent<ISidebarProps> = ({ children }) => {
  return (
    <Piece
      styles={{
        frame: {
          direction: 'east',
          grow: true,
        },
        shape: {
          color: '#000000',
        },
      }}
    >
      <Piece
        styles={{
          frame: {
            space: 20,
            between: 100,
          },
          shape: {
            color: '#5700E3',
            gradient: {
              angle: 45,
              color: ['#000000', '#5700E3'],
            },
          },
        }}
      >
        <Piece
          styles={{
            frame: {
              diameter: 30,
            },
            shape: {
              color: 'white',
            },
          }}
        />
        <Piece
          styles={{
            frame: {
              between: 10,
            },
          }}
        >
          <Piece
            styles={{
              frame: {
                diameter: 30,
              },
              shape: {
                color: 'white',
              },
            }}
          />
          <Piece
            styles={{
              frame: {
                diameter: 30,
              },
              shape: {
                color: 'white',
              },
            }}
          />
          <Piece
            styles={{
              frame: {
                diameter: 30,
              },
              shape: {
                color: 'white',
              },
            }}
          />
        </Piece>
      </Piece>
      <Piece
        styles={{
          frame: {
            grow: true,
          },
          shape: {
            gradient: {
              angle: -45,
              color: ['#000000', '#292431'],
            },
          },
        }}
      >
        {children}
      </Piece>
    </Piece>
  );
};
