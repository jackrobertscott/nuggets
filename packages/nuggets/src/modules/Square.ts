import { FunctionComponent, ReactElement } from 'react';
import {
  createStyledPiece,
  IStyledNugget,
  createCSSFromDigests,
} from '../utils/styles';
import { CSSObject, css } from 'styled-components';

export interface ISquareStylesBorder {
  color?: string;
  thickness?: number;
  style?: string;
  sides?: string[];
}

export interface ISquareStylesCorners {
  radius: number;
}

export interface ISquareStylesShadow {
  color?: string;
  blur?: number;
  grow?: number;
  down?: number;
  across?: number;
}

export interface ISquareStyles {
  color?: string;
  border?: ISquareStylesBorder;
  corners?: ISquareStylesCorners;
  shadow?: ISquareStylesShadow | ISquareStylesShadow[];
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
  ({ corners }) => {
    if (corners === undefined) {
      return false;
    }
    const { radius = 0 } = corners;
    return `border-radius: ${radius}px;`;
  },
  ({ shadow }) => {
    if (shadow === undefined) {
      return false;
    }
    const shadows = Array.isArray(shadow) ? shadow : [shadow];
    const shade = shadows
      .map((item: ISquareStylesShadow) => {
        const {
          color = '#000',
          blur = 0,
          grow = 0,
          down = 0,
          across = 0,
        } = item;
        return `${across}px ${down}px ${blur}px ${grow}px ${color}`;
      })
      .join(', ');
    return `box-shadow: ${shade};`;
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
