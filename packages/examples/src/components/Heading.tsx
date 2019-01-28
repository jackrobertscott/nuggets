import React, { FunctionComponent, ReactElement } from 'react';
import { Piece, Out } from 'nuggets';

export interface IHeadingProps {
  value: string;
  children: ReactElement<any>;
}

export const Heading: FunctionComponent<IHeadingProps> = ({
  value,
  children,
}) => {
  return (
    <Piece
      styles={{
        frame: {
          space: {
            north: 30,
            west: 30,
          },
        },
        texts: {
          size: 20,
          color: 'white',
          thickness: 700,
        },
      }}
    >
      <Piece
        styles={{
          frame: {
            space: {
              south: 10,
              west: 10,
            },
          },
        }}
      >
        <Out value={value} />
      </Piece>
      <Piece>{children}</Piece>
    </Piece>
  );
};
