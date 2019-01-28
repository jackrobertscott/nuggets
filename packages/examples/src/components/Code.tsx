import React, { FunctionComponent } from 'react';
import { Frame } from 'nuggets';

export interface ICodeProps {}

export const Code: FunctionComponent<ICodeProps> = ({}) => {
  return (
    <Frame
      styles={{
        space: 30,
        width: 300,
        gradient: {
          angle: 45,
          color: ['#3f51b5', '#314094'],
        },
        corners: {
          radius: 10,
        },
      }}
    />
  );
};
