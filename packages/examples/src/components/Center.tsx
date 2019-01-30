import React, { FunctionComponent, ReactElement } from 'react';
import { Frame } from 'nuggets';

export interface ICenterProps {
  children: ReactElement<any>;
}

export const Center: FunctionComponent<ICenterProps> = ({ children }) => (
  <Frame
    styles={{
      align: 'center',
      force: 'center',
      grow: true,
    }}
  >
    {children}
  </Frame>
);
