import { FunctionComponent, ReactElement } from 'react';
import {
  createStyledPiece,
  IStyledNugget,
  createCSSFromDigests,
} from '../utils/styles';
import { CSSObject, css } from 'styled-components';

export interface ISquareStyles {
  color?: string;
  overrides?: CSSObject;
}

const digests: Array<(options: ISquareProps) => string | false> = [
  ({ color }) => {
    return color !== undefined && `background-color: ${color};`;
  },
  ({ overrides }) => {
    return overrides !== undefined && `${css(overrides)}`;
  },
];

export type ISquareProps = {
  children?: ReactElement<any>;
} & IStyledNugget<ISquareStyles>;

export const Square: FunctionComponent<ISquareProps> = ({
  children,
  ...options
}) => {
  return createStyledPiece({
    children,
    css: createCSSFromDigests<ISquareStyles>(options, digests),
  });
};
