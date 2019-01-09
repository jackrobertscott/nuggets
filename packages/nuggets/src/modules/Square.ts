import { FunctionComponent } from 'react';
import { createStyledComponent } from '../utils/styles';
import { CSSObject, css } from 'styled-components';

export interface ISquareCSSProps {
  color?: string;
  overrides?: CSSObject;
}

const style = ({ overrides, color }: ISquareCSSProps) => `
  background-color: ${color};
  ${overrides && css(overrides)}
`;

export interface ISquareProps {
  color?: string;
  overrides?: CSSObject;
}

export const Square: FunctionComponent<ISquareProps> = ({
  children,
  overrides,
  ...options
}) => {
  return createStyledComponent(style, {
    children,
    overrides,
    color: digests.color(options),
  });
};

const digests = {
  color({ color }: ISquareProps) {
    return color;
  },
};
