import React, { FunctionComponent } from 'react';
import { Piece } from 'nuggets';

export interface ICodeProps {}

export const Code: FunctionComponent<ICodeProps> = ({}) => {
  return (
    <Piece
      styles={{
        frame: {
          space: 30,
          width: 300,
        },
        shape: {
          gradient: {
            angle: 45,
            color: ['#3f51b5', '#314094'],
          },
          corners: {
            radius: 10,
          },
        },
      }}
    />
  );
};
