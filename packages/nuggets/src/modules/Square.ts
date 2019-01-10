import { FunctionComponent, ReactElement } from 'react';
import { createStyledPiece } from '../utils/styles';
import { CSSObject } from 'styled-components';

export interface ISquareProps {
  color?: string;
  children?: ReactElement<any>;
  overrides?: CSSObject;
}

export const Square: FunctionComponent<ISquareProps> = ({
  children,
  overrides,
  ...options
}) => {
  return createStyledPiece({
    children,
    overrides,
    digests: [digests.color(options)],
  });
};

const digests = {
  color({ color }: ISquareProps) {
    return color && `background-color: ${color};`;
  },
};
