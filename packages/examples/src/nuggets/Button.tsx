import React, { FunctionComponent } from 'react';
import { Square } from 'nuggets';
import colors from '../colors';

const action = {
  surface: {
    color: colors.marine,
    border: {
      color: colors.marineDark,
    },
    hover: {
      color: colors.marineLight,
    },
    press: {
      color: colors.marine,
    },
  },
  words: {
    text: {
      color: colors.marineLighter,
    },
    hover: {
      text: {
        color: colors.white,
      },
    },
  },
};

const danger = {
  surface: {
    color: colors.danger,
    border: {
      color: colors.dangerDark,
    },
    hover: {
      color: colors.dangerLight,
    },
    press: {
      color: colors.danger,
    },
  },
  words: {
    text: {
      color: colors.dangerLighter,
    },
    hover: {
      text: {
        color: colors.white,
      },
    },
  },
};

const dark = {
  surface: {
    color: colors.night,
    border: {
      color: colors.nightDark,
    },
    hover: {
      color: colors.nightLight,
    },
    press: {
      color: colors.night,
    },
  },
  words: {
    text: {
      color: colors.white,
    },
  },
};

export interface IButtonProps {
  children?: string;
  type?: string;
}

const Button: FunctionComponent<IButtonProps> = ({
  children = 'Submit',
  type = 'primary',
}) => {
  let style: any = [action.surface, action.words];
  if (type === 'danger') {
    style = [danger.surface, danger.words];
  }
  if (type === 'dark') {
    style = [dark.surface, dark.words];
  }
  return (
    <Square
      cursor="pointer"
      corners={4}
      transition={200}
      inside={{ sides: 15, verts: 11 }}
      style={style}
    >
      {children}
    </Square>
  );
};

export default Button;
