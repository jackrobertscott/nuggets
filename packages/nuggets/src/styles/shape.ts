import { ICSS, IDigester, IUnit, IDiagonals } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export interface IShadeOptions {
  color?: string;
  blur?: IUnit;
  grow?: IUnit;
  down?: IUnit;
  across?: IUnit;
}

export interface ISideOptions {
  top?: IUnit;
  bottom?: IUnit;
  right?: IUnit;
  left?: IUnit;
}

export interface IBordersOptions {
  color?: string;
  sides?: IUnit | ISideOptions;
  style?:
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';
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

export interface IOverflowOptions {
  down?: string;
  across?: string;
}

export interface IShapeDigester {
  zindex?: number;
  transition?: IUnit;
  cursor?: string;
  overflow?: string | IOverflowOptions;
  events?: string;
  absolute?: IUnit | ISpaceOptions;
  color?: string;
  gradient?: IGradientOptions;
  alpha?: number;
  size?: IUnit;
  circle?: boolean;
  collapse?: boolean;
  width?: IUnit | ISizeOptions;
  height?: IUnit | ISizeOptions;
  padding?: IUnit | ISpaceOptions;
  absorb?: IUnit | ISpaceOptions;
  shadows?: IShadeOptions | IShadeOptions[];
  corners?: IUnit | ICornersOptions;
  borders?: string | IBordersOptions;
}

export const shapeDigester: IDigester<IShapeDigester> = ({
  zindex,
  transition,
  cursor,
  overflow,
  events,
  absolute,
  color,
  gradient,
  alpha,
  size,
  circle,
  collapse,
  width,
  height,
  padding,
  absorb,
  shadows,
  corners,
  borders,
}) => {
  const css: ICSS = {};
  if (zindex !== undefined) {
    css.zIndex = zindex;
  }
  if (transition !== undefined) {
    css.transition = formatUnits(transition, 'ms');
  }
  if (cursor !== undefined) {
    css.cursor = cursor;
  }
  if (overflow !== undefined) {
    if (typeof overflow === 'string') {
      css.overflow = overflow;
    } else {
      css.overflowY = overflow.down;
      css.overflowX = overflow.across;
    }
  }
  if (events !== undefined) {
    css.pointerEvents = events;
  }
  /**
   * Colors.
   */
  if (color !== undefined) {
    css.backgroundColor = color;
  }
  if (gradient !== undefined) {
    const angle = gradient.angle || 10;
    const colors = gradient.color || [];
    css.background = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
  }
  if (alpha !== undefined) {
    if (alpha > 1 || alpha < 0) {
      const message = `The "shape.alpha" property must be between 0 and 1 inclusive, but got "${alpha}".`;
      throw new Error(message);
    }
    css.opacity = alpha;
  }
  /**
   * Sizes.
   */
  if (size !== undefined) {
    css.width = formatUnits(size);
    css.height = formatUnits(size);
  }
  if (circle === true) {
    css.borderRadius = '50%';
  }
  if (collapse !== undefined) {
    if (collapse) {
      css.width = 'fit-content';
    }
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
  if (padding !== undefined) {
    if (typeof padding === 'number' || typeof padding === 'string') {
      css.padding = formatUnits(padding);
    } else {
      const { top, right, bottom, left, sides, verts } = padding;
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
  if (absorb !== undefined) {
    if (typeof absorb === 'number' || typeof absorb === 'string') {
      css.margin = `-${formatUnits(absorb)}`;
    } else {
      const { top, right, bottom, left, sides, verts } = absorb;
      if (verts !== undefined) {
        css.marginTop = `-${formatUnits(verts)}`;
        css.marginBottom = `-${formatUnits(verts)}`;
      }
      if (sides !== undefined) {
        css.marginRight = `-${formatUnits(sides)}`;
        css.marginLeft = `-${formatUnits(sides)}`;
      }
      if (top !== undefined) {
        css.marginTop = `-${formatUnits(top)}`;
      }
      if (right !== undefined) {
        css.marginRight = `-${formatUnits(right)}`;
      }
      if (bottom !== undefined) {
        css.marginBottom = `-${formatUnits(bottom)}`;
      }
      if (left !== undefined) {
        css.marginLeft = `-${formatUnits(left)}`;
      }
    }
  }
  /**
   * Edges.
   */
  if (shadows !== undefined) {
    const createShadow = (data: IShadeOptions) => {
      return [
        formatUnits(data.across),
        formatUnits(data.down),
        formatUnits(data.blur),
        formatUnits(data.grow),
        data.color || 'rgba(0, 0, 0, 0.15)',
      ]
        .join(' ')
        .trim();
    };
    css.boxShadow = Array.isArray(shadows)
      ? shadows.map(createShadow).join(', ')
      : createShadow(shadows);
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
    if (typeof borders === 'string') {
      css.borderColor = borders;
      css.borderStyle = 'solid';
      css.borderWidth = formatUnits(1);
    } else {
      css.borderColor = borders.color;
      css.borderStyle = borders.style || 'solid';
      const { sides } = borders;
      if (typeof sides === 'number' || typeof sides === 'string' || !sides) {
        css.borderWidth = formatUnits(sides || 1);
      } else {
        css.borderWidth = formatUnits(0);
        Object.keys(sides)
          .filter(exists => exists)
          .forEach(side => {
            const sideSize = formatUnits((sides as any)[side]);
            switch (side) {
              case 'top':
                css.borderTopWidth = sideSize;
                break;
              case 'right':
                css.borderRightWidth = sideSize;
                break;
              case 'bottom':
                css.borderBottomWidth = sideSize;
                break;
              case 'left':
                css.borderLeftWidth = sideSize;
                break;
            }
          });
      }
    }
  }
  /**
   * Position.
   */
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
