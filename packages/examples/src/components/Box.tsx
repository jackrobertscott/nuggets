import React, { FunctionComponent } from 'react';
import { Frame, useMedia } from 'nuggets';
import colors from '../colors';

export interface IBoxProps {
  children?: any;
  styles?: {
    [name: string]: unknown;
  };
  shade?: string;
  hover?: boolean;
}

export const Box: FunctionComponent<IBoxProps> = ({
  children,
  styles,
  shade,
  hover,
  ...options
}) => {
  let boxColor;
  let hoverColor;
  switch (shade) {
    default:
    case 'notice':
      hoverColor = colors.notice;
      boxColor = colors.noticeTint;
      break;
    case 'electric':
      hoverColor = colors.electric;
      boxColor = colors.electricTint;
      break;
    case 'strong':
      hoverColor = colors.strong;
      boxColor = colors.strongTint;
      break;
  }
  return (
    <Frame
      styles={{
        color: boxColor,
        transition: 200,
        gradient: {
          angle: 45,
          color: ['green', 'red', 'blue'],
        },
        shade: {
          color: 'rgba(0, 0, 0, 0.3)',
          blur: 10,
          down: 3,
        },
        hover: hover
          ? {
              cursor: 'pointer',
              color: hoverColor,
            }
          : {},
        ...styles,
      }}
      {...options}
    >
      {children}
    </Frame>
  );
};
