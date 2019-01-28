import React, { FunctionComponent } from 'react';
import { Piece, In } from 'nuggets';

export interface ISearchProps {
  value?: string;
  change?: () => string;
}

export const Search: FunctionComponent<ISearchProps> = ({ ...inputs }) => {
  return (
    <Piece
      styles={{
        frame: {
          space: {
            north: 30,
            west: 30,
          },
        },
      }}
    >
      <Piece
        styles={{
          frame: {
            space: {
              verts: 15,
              sides: 20,
            },
          },
          shape: {
            gradient: {
              angle: 45,
              color: ['#9365ff', '#360f90'],
            },
            corners: {
              radius: 10,
              points: ['northwest', 'southwest'],
            },
          },
          texts: {
            size: 16,
            color: 'white',
            placeholder: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
        }}
      >
        <In placeholder="Search" {...inputs} />
      </Piece>
    </Piece>
  );
};
