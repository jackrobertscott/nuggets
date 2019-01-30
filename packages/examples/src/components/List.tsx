import React, { FunctionComponent } from 'react';
import { Frame } from 'nuggets';

export interface IListProps {
  children?: any;
  styles?: {
    [name: string]: unknown;
  };
}

export const List: FunctionComponent<IListProps> = ({
  children,
  styles,
  ...options
}) => {
  return (
    <Frame
      styles={{
        direction: 'down',
        space: 15,
        between: 15,
        ...styles,
      }}
      {...options}
    >
      {children}
    </Frame>
  );
};
