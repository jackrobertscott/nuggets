import React, { FunctionComponent, ReactNode } from 'react';
import { Square } from 'nuggets';
import colors from '../colors';

export interface IButtonProps {
  words?: ReactNode;
}

const Button: FunctionComponent<IButtonProps> = ({ words = 'Submit' }) => {
  return (
    <Square
      cursor="pointer"
      corners={4}
      transition={200}
      inside={{ sides: 15, verts: 11 }}
      style={{
        color: colors.marine,
        hover: {
          color: colors.marineLight,
        },
        press: {
          color: colors.marine,
        },
      }}
      text={{
        color: colors.marineLighter,
        hover: {
          color: colors.white,
        },
      }}
      border={{
        color: colors.marineDark,
      }}
    >
      {words}
    </Square>
  );
};

export default Button;
