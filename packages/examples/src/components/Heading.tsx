import React, { FunctionComponent, ReactElement } from 'react';
import { Frame, Out } from 'nuggets';

export interface IHeadingProps {
  value: string;
  children: ReactElement<any>;
}

export const Heading: FunctionComponent<IHeadingProps> = ({
  value,
  children,
}) => {
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
            south: 10,
            west: 10,
          },
        }}
      >
        <Out
          value={value}
          styles={{
            size: 20,
            color: 'white',
            thickness: 700,
          }}
        />
      </Frame>
      <Frame>{children}</Frame>
    </Frame>
  );
};
