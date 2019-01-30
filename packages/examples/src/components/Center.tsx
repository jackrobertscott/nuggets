import React, { FunctionComponent, ReactElement } from 'react';
import { Frame } from 'nuggets';

export interface ICenterProps {
  children: ReactElement<any>;
}

export const Center: FunctionComponent<ICenterProps> = ({ children }) => (
  <Frame
    styles={{
      align: 'center',
      grow: true,
    }}
  >
    <Frame
      styles={{
        align: 'center',
        direction: 'east',
      }}
    >
      {children}
    </Frame>
  </Frame>
);
