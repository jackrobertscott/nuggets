import {
  ICSS,
  IDigester,
  ISides,
  IUnit,
  IDirections,
  IDiagonals,
} from '../utils/types';
import { formatUnits } from '../utils/helpers';

export interface ITransform3dOptions {
  x?: IUnit;
  y?: IUnit;
  z?: IUnit;
}

export interface IShadeOptions {
  color?: string;
  blur?: IUnit;
  grow?: IUnit;
  down?: IUnit;
  across?: IUnit;
}

export interface IBordersOptions {
  color?: string;
  thickness?: IUnit;
  style?:
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';
  sides?: ISides[];
}

export type ICornersOptions = { [sides in IDiagonals]?: IUnit };

export interface IGradientOptions {
  angle?: number;
  color?: string[];
}

export interface ISizeOptions {
  use?: IUnit;
  min?: IUnit;
  max?: IUnit;
}

export interface ISpaceOptions {
  sides?: IUnit;
  verts?: IUnit;
  top?: IUnit;
  bottom?: IUnit;
  right?: IUnit;
  left?: IUnit;
}

export interface IShapeDigester {
  color?: string;
  alpha?: number;
  gradient?: IGradientOptions;
  shade?: IShadeOptions;
  corners?: IUnit | ICornersOptions;
  borders?: IBordersOptions;
  direction?: IDirections;
  force?: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'even';
  align?: 'start' | 'end' | 'center' | 'stretch';
  space?: IUnit | ISpaceOptions;
  absolute?: IUnit | ISpaceOptions;
  zindex?: number;
  between?: IUnit;
  circle?: boolean;
  size?: IUnit;
  width?: IUnit | ISizeOptions;
  height?: IUnit | ISizeOptions;
  grow?: boolean;
  collapse?: boolean;
  transition?: IUnit;
  cursor?: string;
  overflow?: string;
  rotate?: IUnit | ITransform3dOptions;
  scale?: number | ITransform3dOptions;
  translate?: IUnit | ITransform3dOptions;
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
  zindex,
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
      formatUnits(shade.across),
      formatUnits(shade.down),
      formatUnits(shade.blur),
      formatUnits(shade.grow),
      shadeColor,
    ].join(' ');
  }
  if (corners !== undefined) {
    if (typeof corners === 'number' || typeof corners === 'string') {
      css.borderRadius = formatUnits(corners);
    } else {
      Object.keys(corners)
        .filter(exists => exists)
        .forEach(side => {
          const radiusSize = formatUnits((corners as any)[side]);
          switch (side) {
            case 'top':
              css.borderTopRightRadius = radiusSize;
              css.borderTopLeftRadius = radiusSize;
              break;
            case 'right':
              css.borderTopRightRadius = radiusSize;
              css.borderBottomRightRadius = radiusSize;
              break;
            case 'bottom':
              css.borderBottomRightRadius = radiusSize;
              css.borderBottomLeftRadius = radiusSize;
              break;
            case 'left':
              css.borderTopLeftRadius = radiusSize;
              css.borderBottomLeftRadius = radiusSize;
              break;
            case 'topRight':
              css.borderTopRightRadius = radiusSize;
              break;
            case 'topLeft':
              css.borderTopLeftRadius = radiusSize;
              break;
            case 'bottomRight':
              css.borderBottomRightRadius = radiusSize;
              break;
            case 'bottomLeft':
              css.borderBottomLeftRadius = radiusSize;
              break;
          }
        });
    }
  }
  if (borders !== undefined) {
    css.borderColor = borders.color || '#000';
    css.borderStyle = borders.style || 'solid';
    if (borders.sides) {
      css.borderWidth = formatUnits(0);
      borders.sides
        .filter(exists => exists)
        .forEach(side => {
          const borderSize = formatUnits(borders.thickness || 1);
          switch (side) {
            case 'top':
              css.borderTopWidth = borderSize;
              break;
            case 'right':
              css.borderRightWidth = borderSize;
              break;
            case 'bottom':
              css.borderBottomWidth = borderSize;
              break;
            case 'left':
              css.borderLeftWidth = borderSize;
              break;
          }
        });
    } else {
      css.borderWidth = formatUnits(borders.thickness || 1);
    }
  }
  if (direction !== undefined) {
    switch (direction) {
      default:
      case 'down':
        css.flexDirection = 'column';
        break;
      case 'up':
        css.flexDirection = 'column-reverse';
        break;
      case 'right':
        css.flexDirection = 'row';
        break;
      case 'left':
        css.flexDirection = 'row-reverse';
        break;
    }
  }
  if (between !== undefined) {
    const side =
      direction === 'left'
        ? 'Left'
        : direction === 'right'
        ? 'Right'
        : direction === 'up'
        ? 'Top'
        : 'Bottom';
    css['& > *'] = {
      [`margin${side}`]: formatUnits(between),
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
      css.padding = formatUnits(space);
    } else {
      const { top, right, bottom, left, sides, verts } = space;
      if (verts !== undefined) {
        css.paddingTop = formatUnits(verts);
        css.paddingBottom = formatUnits(verts);
      }
      if (sides !== undefined) {
        css.paddingRight = formatUnits(sides);
        css.paddingLeft = formatUnits(sides);
      }
      if (top !== undefined) {
        css.paddingTop = formatUnits(top);
      }
      if (right !== undefined) {
        css.paddingRight = formatUnits(right);
      }
      if (bottom !== undefined) {
        css.paddingBottom = formatUnits(bottom);
      }
      if (left !== undefined) {
        css.paddingLeft = formatUnits(left);
      }
    }
  }
  if (zindex !== undefined) {
    css.zIndex = zindex;
  }
  if (circle === true) {
    css.borderRadius = '50%';
  }
  if (size !== undefined) {
    css.height = formatUnits(size);
    css.width = formatUnits(size);
  }
  if (grow !== undefined) {
    css.flexGrow = grow ? 1 : 0;
  }
  if (collapse !== undefined) {
    css.width = 'fit-content';
  }
  if (width !== undefined) {
    if (typeof width === 'number' || typeof width === 'string') {
      css.width = formatUnits(width);
    } else {
      const { min, max, use } = width as ISizeOptions;
      if (min) {
        css.minWidth = formatUnits(min);
      }
      if (max) {
        css.maxWidth = formatUnits(max);
      }
      if (use) {
        css.width = formatUnits(use);
      }
    }
  }
  if (height !== undefined) {
    if (typeof height === 'number' || typeof height === 'string') {
      css.height = formatUnits(height);
    } else {
      const { min, max, use } = height as ISizeOptions;
      if (min) {
        css.minHeight = formatUnits(min);
      }
      if (max) {
        css.maxHeight = formatUnits(max);
      }
      if (use) {
        css.height = formatUnits(use);
      }
    }
  }
  if (transition !== undefined) {
    css.transition = formatUnits(transition, 'ms');
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
      css.top = formatUnits(absolute);
      css.right = formatUnits(absolute);
      css.bottom = formatUnits(absolute);
      css.left = formatUnits(absolute);
    } else {
      const { top, right, bottom, left, sides, verts } = absolute;
      if (verts !== undefined) {
        css.top = formatUnits(verts);
        css.bottom = formatUnits(verts);
      }
      if (sides !== undefined) {
        css.right = formatUnits(sides);
        css.left = formatUnits(sides);
      }
      if (top !== undefined) {
        css.top = formatUnits(top);
      }
      if (right !== undefined) {
        css.right = formatUnits(right);
      }
      if (bottom !== undefined) {
        css.bottom = formatUnits(bottom);
      }
      if (left !== undefined) {
        css.left = formatUnits(left);
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
  rotate?: IUnit | ITransform3dOptions
): string => {
  let transforms = '';
  if (rotate !== undefined) {
    if (typeof rotate === 'number' || typeof rotate === 'string') {
      transforms = createTransform('rotate', formatUnits(rotate, 'deg'));
    } else {
      const { x, y, z } = rotate as ITransform3dOptions;
      transforms = [
        transforms,
        createTransform('rotateX', formatUnits(x, 'deg')),
        createTransform('rotateY', formatUnits(y, 'deg')),
        createTransform('rotateZ', formatUnits(z, 'deg')),
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
    if (typeof scale === 'number') {
      transforms = createTransform('scale', scale);
    } else {
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
  translate?: IUnit | ITransform3dOptions
): string => {
  let transforms = '';
  if (translate !== undefined) {
    if (typeof translate === 'number' || typeof translate === 'string') {
      transforms = createTransform('translate', translate);
    } else {
      const { x, y, z } = translate as ITransform3dOptions;
      if (z === undefined) {
        transforms = `translate(${formatUnits(x)}, ${formatUnits(y)})`;
      } else {
        transforms = `translate3d(${formatUnits(x)}, ${formatUnits(
          y
        )}, ${formatUnits(z)})`;
      }
    }
  }
  return transforms;
};
