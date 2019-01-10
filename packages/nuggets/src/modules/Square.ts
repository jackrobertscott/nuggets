import { FunctionComponent, ReactElement } from 'react';
import { createStyledPiece } from '../utils/styles';
import { CSSObject } from 'styled-components';

export const Square: FunctionComponent<ISquareProps> = ({
  children,
  overrides,
  ...options
}) => {
  return createStyledPiece({
    children,
    overrides,
    digests: digests.map(rule => rule(options)),
  });
};

export interface ISquareProps {
  color?: string;
  children?: ReactElement<any>;
  overrides?: CSSObject;
}

const digests: Array<(options: ISquareProps) => string | false> = [
  ({ color }: ISquareProps) => {
    return color !== undefined && `background-color: ${color};`;
  },
];
