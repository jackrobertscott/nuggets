import {
  ICSS,
  IDigester,
  IDirections,
  IDirectionsDiagonals,
} from '../utils/types';
import { stringsAndPixels } from '../utils/helpers';

export interface ISizeOptions {
  use?: number | string;
  min?: number | string;
  max?: number | string;
}

export interface IShadeOptions {
  color?: string;
  blur?: number;
  grow?: number;
  down?: number;
  across?: number;
}

export interface IBordersOptions {
  color?: string;
  thickness?: number;
  style?:
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';
  sides?: IDirections[];
}

export interface ICornersOptions {
  radius?: number;
  points?: Array<IDirections | IDirectionsDiagonals>;
}

export interface IShapeDigester {
  color?: string;
  diameter?: number;
  width?: number | string | ISizeOptions;
  height?: number | string | ISizeOptions;
  shade?: IShadeOptions;
  corners?: ICornersOptions;
  borders?: IBordersOptions;
}

export const digestShape: IDigester<IShapeDigester> = ({
  color,
  diameter,
  height,
  width,
  shade,
  corners,
  borders,
}) => {
  const css: ICSS = {};
  if (color !== undefined) {
    css.backgroundColor = color;
  }
  if (diameter !== undefined) {
    css.borderRadius = '50%';
    css.height = stringsAndPixels(diameter);
    css.width = stringsAndPixels(diameter);
  }
  if (width !== undefined) {
    if (typeof width === 'number' || typeof width === 'string') {
      css.width = stringsAndPixels(width);
    } else {
      const { min, max, use } = width as ISizeOptions;
      if (min) {
        css.minWidth = stringsAndPixels(min);
      }
      if (max) {
        css.maxWidth = stringsAndPixels(max);
      }
      if (use) {
        css.width = stringsAndPixels(use);
      }
    }
  }
  if (height !== undefined) {
    if (typeof height === 'number' || typeof height === 'string') {
      css.height = stringsAndPixels(height);
    } else {
      const { min, max, use } = height as ISizeOptions;
      if (min) {
        css.minHeight = stringsAndPixels(min);
      }
      if (max) {
        css.maxHeight = stringsAndPixels(max);
      }
      if (use) {
        css.height = stringsAndPixels(use);
      }
    }
  }
  if (shade !== undefined) {
    const {
      blur = 0,
      grow = 0,
      down = 0,
      across = 0,
      color: shadeColor = '#000',
    } = shade;
    css.boxShadow = [
      stringsAndPixels(across),
      stringsAndPixels(down),
      stringsAndPixels(blur),
      stringsAndPixels(grow),
      shadeColor,
    ].join(' ');
  }
  if (corners !== undefined) {
    const { radius = 0, points = [] } = corners;
    if (points.length) {
      css.borderRadius = stringsAndPixels(0);
      points
        .filter(exists => exists)
        .forEach(side => {
          const size = stringsAndPixels(radius);
          switch ((side as string).toLowerCase()) {
            case 'north':
              css.borderTopRightRadius = size;
              css.borderTopLeftRadius = size;
              break;
            case 'east':
              css.borderTopRightRadius = size;
              css.borderBottomRightRadius = size;
              break;
            case 'south':
              css.borderBottomRightRadius = size;
              css.borderBottomLeftRadius = size;
              break;
            case 'west':
              css.borderTopLeftRadius = size;
              css.borderBottomLeftRadius = size;
              break;
            case 'northeast':
              css.borderTopRightRadius = size;
              break;
            case 'northwest':
              css.borderTopLeftRadius = size;
              break;
            case 'southeast':
              css.borderBottomRightRadius = size;
              break;
            case 'southwest':
              css.borderBottomLeftRadius = size;
              break;
          }
        });
    } else {
      css.borderRadius = stringsAndPixels(radius);
    }
  }
  if (borders !== undefined) {
    css.borderColor = borders.color || '#000';
    css.borderStyle = borders.style || 'solid';
    if (borders.sides) {
      css.borderWidth = stringsAndPixels(0);
      borders.sides
        .filter(exists => exists)
        .forEach(side => {
          const size = stringsAndPixels(borders.thickness || 1);
          switch ((side as string).toLowerCase()) {
            case 'north':
              css.borderTopWidth = size;
              break;
            case 'east':
              css.borderRightWidth = size;
              break;
            case 'south':
              css.borderBottomWidth = size;
              break;
            case 'west':
              css.borderLeftWidth = size;
              break;
          }
        });
    } else {
      css.borderWidth = stringsAndPixels(borders.thickness || 1);
    }
  }
  return css;
};
