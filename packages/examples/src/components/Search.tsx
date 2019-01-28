import React, { FunctionComponent } from 'react';
import { Frame, In } from 'nuggets';

export interface ISearchProps {
  value?: string;
  change?: () => string;
}

export const Search: FunctionComponent<ISearchProps> = ({ ...inputs }) => {
  return (
    <Frame
      styles={{
        space: {
          north: 30,
          west: 30,
        },
      }}
    >
      <Frame
        styles={{
          space: {
            verts: 15,
            sides: 20,
          },
          gradient: {
            angle: 45,
            color: ['#9365ff', '#360f90'],
          },
          corners: {
            radius: 10,
            points: ['northwest', 'southwest'],
          },
        }}
      >
        <In
          placeholder="Search"
          styles={{
            size: 16,
            color: 'white',
            placeholder: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          }}
          {...inputs}
        />
      </Frame>
    </Frame>
  );
};
