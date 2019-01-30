import {
  ICSS,
  IDigester,
  IDirections,
  IDirectionsDiagonals,
} from '../utils/types';
import { stringsAndPixels } from '../utils/helpers';

export interface ITransform3dOptions {
  x?: number | string;
  y?: number | string;
  z?: number | string;
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

export interface IGradientOptions {
  angle?: number;
  color?: Array<string | number>;
}

export interface ISizeOptions {
  use?: number | string;
  min?: number | string;
  max?: number | string;
}

export interface ISpaceOptions {
  sides?: number;
  verts?: number;
  north?: number;
  south?: number;
  east?: number;
  west?: number;
}

export interface IShapeDigester {
  color?: string;
  alpha?: number;
  gradient?: IGradientOptions;
  shade?: IShadeOptions;
  corners?: ICornersOptions;
  borders?: IBordersOptions;
  direction?: IDirections;
  force?: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'even';
  align?: 'start' | 'end' | 'center' | 'stretch';
  space?: number | string | ISpaceOptions;
  absolute?: number | string | ISpaceOptions;
  between?: number | string;
  circle?: boolean;
  size?: number | string;
  width?: number | string | ISizeOptions;
  height?: number | string | ISizeOptions;
  grow?: boolean;
  collapse?: boolean;
  transition?: number;
  cursor?: string;
  overflow?: string;
  rotate?: number | string | ITransform3dOptions;
  scale?: number | ITransform3dOptions;
  translate?: number | ITransform3dOptions;
}

export const digestShape: IDigester<IShapeDigester> = ({
  color,
  gradient,
  alpha,
  shade,
  corners,
  borders,
  direction,
  between,
  force,
  align,
  space,
  absolute,
  circle,
  size,
  height,
  width,
  grow,
  collapse,
  transition,
  cursor,
  overflow,
  rotate,
  scale,
  translate,
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
          const radiusSize = stringsAndPixels(radius);
          switch ((side as string).toLowerCase()) {
            case 'north':
              css.borderTopRightRadius = radiusSize;
              css.borderTopLeftRadius = radiusSize;
              break;
            case 'east':
              css.borderTopRightRadius = radiusSize;
              css.borderBottomRightRadius = radiusSize;
              break;
            case 'south':
              css.borderBottomRightRadius = radiusSize;
              css.borderBottomLeftRadius = radiusSize;
              break;
            case 'west':
              css.borderTopLeftRadius = radiusSize;
              css.borderBottomLeftRadius = radiusSize;
              break;
            case 'northeast':
              css.borderTopRightRadius = radiusSize;
              break;
            case 'northwest':
              css.borderTopLeftRadius = radiusSize;
              break;
            case 'southeast':
              css.borderBottomRightRadius = radiusSize;
              break;
            case 'southwest':
              css.borderBottomLeftRadius = radiusSize;
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
          const borderSize = stringsAndPixels(borders.thickness || 1);
          switch ((side as string).toLowerCase()) {
            case 'north':
              css.borderTopWidth = borderSize;
              break;
            case 'east':
              css.borderRightWidth = borderSize;
              break;
            case 'south':
              css.borderBottomWidth = borderSize;
              break;
            case 'west':
              css.borderLeftWidth = borderSize;
              break;
          }
        });
    } else {
      css.borderWidth = stringsAndPixels(borders.thickness || 1);
    }
  }
  if (direction !== undefined) {
    switch (direction) {
      default:
      case 'south':
        css.flexDirection = 'column';
        break;
      case 'north':
        css.flexDirection = 'column-reverse';
        break;
      case 'east':
        css.flexDirection = 'row';
        break;
      case 'west':
        css.flexDirection = 'row-reverse';
        break;
    }
  }
  if (between !== undefined) {
    const side =
      !direction || direction === 'south'
        ? 'Bottom'
        : direction === 'east'
        ? 'Right'
        : direction === 'north'
        ? 'Top'
        : 'Left';
    css['& > *'] = {
      [`margin${side}`]: stringsAndPixels(between),
      [':last-child']: {
        [`margin${side}`]: 0,
      },
    };
  }
  if (force !== undefined) {
    switch (force) {
      default:
      case 'start':
        css.justifyContent = 'flex-start';
        break;
      case 'end':
        css.justifyContent = 'flex-end';
        break;
      case 'center':
        css.justifyContent = 'center';
        break;
      case 'between':
        css.justifyContent = 'space-between';
        break;
      case 'even':
        css.justifyContent = 'space-evenly';
        break;
      case 'stretch':
        css.justifyContent = 'stretch';
        break;
    }
  }
  if (align !== undefined) {
    switch (align) {
      default:
      case 'start':
        css.alignItems = 'flex-start';
        break;
      case 'end':
        css.alignItems = 'flex-end';
        break;
      case 'center':
        css.alignItems = 'center';
        break;
      case 'stretch':
        css.alignItems = 'stretch';
        break;
    }
  }
  if (space !== undefined) {
    if (typeof space === 'number' || typeof space === 'string') {
      css.padding = stringsAndPixels(space);
    } else {
      const { north, east, south, west, sides, verts } = space;
      if (verts) {
        css.paddingTop = stringsAndPixels(verts);
        css.paddingBottom = stringsAndPixels(verts);
      }
      if (sides) {
        css.paddingRight = stringsAndPixels(sides);
        css.paddingLeft = stringsAndPixels(sides);
      }
      if (north) {
        css.paddingTop = stringsAndPixels(north);
      }
      if (east) {
        css.paddingRight = stringsAndPixels(east);
      }
      if (south) {
        css.paddingBottom = stringsAndPixels(south);
      }
      if (west) {
        css.paddingLeft = stringsAndPixels(west);
      }
    }
  }
  if (circle === true) {
    css.borderRadius = '50%';
  }
  if (size !== undefined) {
    css.height = stringsAndPixels(size);
    css.width = stringsAndPixels(size);
  }
  if (grow !== undefined) {
    css.flexGrow = grow ? 1 : 0;
  }
  if (collapse !== undefined) {
    css.width = 'fit-content';
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
  if (transition !== undefined) {
    css.transition = stringsAndPixels(transition, 'ms');
  }
  if (cursor !== undefined) {
    css.cursor = cursor;
  }
  if (overflow !== undefined) {
    css.overflow = overflow;
  }
  const transforms: string[] = [];
  if (rotate !== undefined) {
    transforms.push(createRotateTransform(rotate));
  }
  if (scale !== undefined) {
    transforms.push(createScaleTransform(scale));
  }
  if (translate !== undefined) {
    transforms.push(createTranslateTransform(translate));
  }
  if (transforms.length) {
    css.transform = transforms
      .filter(exists => exists)
      .join(' ')
      .trim();
  }
  if (absolute !== undefined) {
    css.position = 'absolute';
    css.margin = 0;
    if (typeof absolute === 'number' || typeof absolute === 'string') {
      css.top = stringsAndPixels(absolute);
      css.right = stringsAndPixels(absolute);
      css.bottom = stringsAndPixels(absolute);
      css.left = stringsAndPixels(absolute);
    } else {
      const { north, east, south, west, sides, verts } = absolute;
      if (verts) {
        css.top = stringsAndPixels(verts);
        css.bottom = stringsAndPixels(verts);
      }
      if (sides) {
        css.right = stringsAndPixels(sides);
        css.left = stringsAndPixels(sides);
      }
      if (north) {
        css.top = stringsAndPixels(north);
      }
      if (east) {
        css.right = stringsAndPixels(east);
      }
      if (south) {
        css.bottom = stringsAndPixels(south);
      }
      if (west) {
        css.left = stringsAndPixels(west);
      }
    }
  }
  return css;
};

const createTransform = (name: string, value: any): string => {
  if (typeof value === 'number' || typeof value === 'string') {
    return `${name}(${value})`;
  }
  return '';
};

const createRotateTransform = (
  rotate?: number | string | ITransform3dOptions
): string => {
  let transforms = '';
  if (rotate !== undefined) {
    transforms = createTransform(
      'rotate',
      typeof rotate === 'number' ? `${rotate}deg` : rotate
    );
    if (!transforms) {
      const { x, y, z } = rotate as ITransform3dOptions;
      transforms = [
        transforms,
        createTransform('rotateX', typeof x === 'number' ? `${x}deg` : x),
        createTransform('rotateY', typeof y === 'number' ? `${y}deg` : y),
        createTransform('rotateZ', typeof z === 'number' ? `${z}deg` : z),
      ]
        .filter(exists => exists)
        .join(' ')
        .trim();
    }
  }
  return transforms;
};

const createScaleTransform = (scale?: number | ITransform3dOptions): string => {
  let transforms = '';
  if (scale !== undefined) {
    transforms = createTransform('scale', scale);
    if (!transforms) {
      const { x, y, z } = scale as ITransform3dOptions;
      transforms =
        z === undefined
          ? `scale(${x || 1}, ${y || 1})`
          : `scale3d(${x || 1}, ${y || 1}, ${z || 1})`;
    }
  }
  return transforms;
};

const createTranslateTransform = (
  translate?: number | ITransform3dOptions
): string => {
  let transforms = '';
  if (translate !== undefined) {
    transforms = createTransform('translate', translate);
    if (!transforms) {
      const { x, y, z } = translate as ITransform3dOptions;
      const format = (value?: number | string) =>
        typeof value === 'string' ? value : `${value || 0}px`;
      transforms =
        z === undefined
          ? `translate(${format(x)}, ${format(y)})`
          : `translate3d(${format(x)}, ${format(y)}, ${format(z)})`;
    }
  }
  return transforms;
};
