import { FunctionComponent, ReactElement } from 'react';
import {
  createStyledPiece,
  IStyledNugget,
  createCSSFromDigests,
} from '../utils/styles';
import { CSSObject, css } from 'styled-components';

export interface ISquareStyles {
  color?: string;
  border?: {
    color?: string;
    thickness?: number;
    style?: string;
    sides?: string[];
  };
  overrides?: CSSObject;
}

const digests: Array<(options: ISquareProps) => string | false> = [
  ({ color }) => {
    return color !== undefined && `background-color: ${color};`;
  },
  ({ border }) => {
    if (border === undefined) {
      return false;
    }
    const {
      color = '#000',
      thickness = 1,
      style = 'solid',
      sides = [],
    } = border;
    if (sides.length) {
      return sides
        .map(side => `border-${side}: ${thickness}px ${style} ${color};`)
        .join('\n');
    }
    return `border: ${thickness}px ${style} ${color};`;
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
