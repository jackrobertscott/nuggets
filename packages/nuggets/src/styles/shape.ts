import {
  ICSS,
  IDigester,
  IDirections,
  IDirectionsDiagonals,
} from '../utils/types';
import { stringsAndPixels } from '../utils/helpers';

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

export interface IGradientOptions {
  angle?: number;
  color?: Array<string | number>;
}

export interface IShapeDigester {
  color?: string;
  alpha?: number;
  gradient?: IGradientOptions;
  shade?: IShadeOptions;
  corners?: ICornersOptions;
  borders?: IBordersOptions;
}

export const digestShape: IDigester<IShapeDigester> = ({
  color,
  gradient,
  alpha,
  shade,
  corners,
  borders,
}) => {
  const css: ICSS = {};
  if (color !== undefined) {
    css.backgroundColor = color;
  }
  if (alpha !== undefined) {
    if (alpha > 1 || alpha < 0) {
      const message = `The "shape.alpha" property must be between 0 and 1 inclusive, but got "${alpha}".`;
      throw new Error(message);
    }
    css.opacity = alpha;
  }
  if (gradient !== undefined) {
    const angle = gradient.angle || 10;
    const colors = gradient.color || [];
    css.background = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
  }
  if (shade !== undefined) {
    const shadeColor = shade.color || '#000';
    css.boxShadow = [
      stringsAndPixels(shade.across),
      stringsAndPixels(shade.down),
      stringsAndPixels(shade.blur),
      stringsAndPixels(shade.grow),
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
