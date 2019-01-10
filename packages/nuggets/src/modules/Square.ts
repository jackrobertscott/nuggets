import { FunctionComponent, ReactElement } from 'react';
import { createStyledPiece } from '../utils/styles';
import { CSSObject, css } from 'styled-components';

export const Square: FunctionComponent<ISquareProps> = ({
  children,
  style,
  ...options
}) => {
  const data = { ...style, ...options };
  return createStyledPiece({
    children,
    digests: digests.map(rule => rule(data)),
  });
};

export interface ISquareProps {
  color?: string;
  children?: ReactElement<any>;
  overrides?: CSSObject;
  style?: ISquareProps;
}

const digests: Array<(options: ISquareProps) => string | false> = [
  ({ color }) => {
    return color !== undefined && `background-color: ${color};`;
  },
  ({ overrides }) => {
    return overrides !== undefined && `${css(overrides)}`;
  },
];
