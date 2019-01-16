import React, { FunctionComponent } from 'react';
import { Square, Insert } from 'nuggets';
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
      <Insert
        inside={20}
        color="yellow"
        text={{ color: 'black' }}
        corners={{ radius: 3 }}
        value={'hello'}
      />
    </Square>
  );
};

export default Button;
