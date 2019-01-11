import { FunctionComponent, ReactElement } from 'react';
import { createDomPiece, INugget } from '../utils/dom';
import {
  createCSSFromDigests,
  ICSSObject,
  IDigestArray,
} from '../utils/styles';
import { createEvents, IEvents } from '../utils/events';

export interface ISquareStylesBorder {
  color?: string;
  thickness?: number;
  style?: string;
  sides?: Array<'top' | 'left' | 'bottom' | 'right'>;
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
  overrides?: ICSSObject;
}

const digests: IDigestArray<ISquareStyles> = [
  ({ color }) => color !== undefined && { backgroundColor: color },
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
      return sides.reduce((accum: any, side) => {
        let upperSide;
        switch (side) {
          case 'top':
            upperSide = 'Top';
            break;
          case 'bottom':
            upperSide = 'Bottom';
            break;
          case 'left':
            upperSide = 'Left';
            break;
          case 'right':
            upperSide = 'Right';
            break;
          default:
            break;
        }
        accum[`border${upperSide}`] = `${thickness}px ${style} ${color}`;
        return accum;
      }, {});
    }
    return {
      border: `${thickness}px ${style} ${color}`,
    };
  },
  ({ corners }) => {
    if (corners === undefined) {
      return false;
    }
    const { radius = 0 } = corners;
    return {
      borderRadius: `${radius}px`,
    };
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
    return {
      boxShadow: shade,
    };
  },
  ({ overrides }) => overrides !== undefined && overrides,
];

export type ISquareProps = {
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INugget<ISquareStyles, IEvents>;

export const Square: FunctionComponent<ISquareProps> = ({
  children,
  ...options
}) => {
  return createDomPiece({
    children,
    options,
    attrs: createEvents(options),
    css: createCSSFromDigests<ISquareStyles>(options, digests),
  });
};
