import React, { FunctionComponent } from 'react';
import { Square, Text } from 'nuggets';
import colors from '../colors';

export interface IButtonProps {
  words?: string;
}

const blue = {
  color: colors.marine,
  hover: {
    color: 'yellow',
  },
  press: {
    color: 'green',
  },
};

/**
 * We need to remove the <Text /> comp and replace it with a property on the
 * other dom components. This is because we the <Text /> comp will remove
 * the parent text styles when it cleans the styling.
 */

const Button: FunctionComponent<IButtonProps> = ({ words }) => {
  return (
    <Square
      cursor="pointer"
      corners={4}
      transition={200}
      inside={{ sides: 15, verts: 11 }}
      style={{
        ...blue,
        hover: {
          border: { thickness: 10 },
        },
      }}
      text={blue}
      border={{
        color: 'green',
      }}
    >
      <Text>{words || 'Submit'}</Text>
      <Square border={{ color: 'red' }} />
      <Square
        height={100}
        style={[
          {
            border: { color: 'red' },
          },
          {
            border: { thickness: 30 },
          },
        ]}
      />
      <Square
        hover={{
          border: { color: 'red' },
        }}
      />
      <Square
        style={{
          style: {
            border: { color: 'red' },
          },
          hover: {
            border: { color: 'red' },
          },
        }}
      />
    </Square>
  );
};

export default Button;
