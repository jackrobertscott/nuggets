import React, { FunctionComponent } from 'react';
import { Frame } from 'nuggets';
import colors from '../colors';

export interface IBoxProps {
  children?: any;
  styles?: {
    [name: string]: unknown;
  };
  shade?: string;
}

export const Box: FunctionComponent<IBoxProps> = ({
  children,
  styles,
  ...options
}) => {
  return (
    <Frame
      styles={{
        color: colors.noticeTint,
        corners: {
          southwest: 5,
        },
        ...styles,
      }}
      {...options}
    >
      {children}
    </Frame>
  );
};
