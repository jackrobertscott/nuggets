import React, { FunctionComponent, ReactElement } from 'react';
import { Frame, useToggle, Layer, Out } from 'nuggets';

export interface ISidebarProps {
  children: ReactElement<any> | Array<ReactElement<any>>;
}

export const Sidebar: FunctionComponent<ISidebarProps> = ({ children }) => {
  const { active, on, off } = useToggle();
  return (
    <Frame
      styles={{
        direction: 'east',
        grow: true,
        color: '#000000',
      }}
    >
      <Layer id="modals">
        <Frame
          events={{
            mouseEnter: on,
            mouseLeave: off,
          }}
          styles={{
            grow: true,
            width: 'collapse',
            space: {
              verts: 20,
              sides: 20,
            },
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
                width: active ? 100 : undefined,
                color: 'white',
              }}
            />
            <Frame
              styles={{
                diameter: 30,
                width: active ? 100 : undefined,
                color: 'white',
              }}
            />
            <Frame
              styles={{
                diameter: 30,
                width: active ? 100 : undefined,
                color: 'white',
              }}
            />
          </Frame>
        </Frame>
      </Layer>
      <Frame
        styles={{
          grow: true,
          space: {
            west: 80,
          },
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
