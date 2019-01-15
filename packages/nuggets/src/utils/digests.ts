import { ICSSObject } from './styles';

const formatValue = (value: string | number, type: string = 'px'): string =>
  typeof value === 'string' ? value : `${value}${type}`;

/**
 * Background color.
 */
export interface IBackgroundColorDigester {
  color?: string;
}
export const digestBackgroundColor = ({ color }: IBackgroundColorDigester) => {
  if (color === undefined) {
    return {};
  }
  return { backgroundColor: color };
};

/**
 * Padding and margins.
 */
export interface ISpaceObjectDigester {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
export interface ISpaceDigester {
  inside?: number | ISpaceObjectDigester;
  outside?: number | ISpaceObjectDigester;
}
export const digestSpace = ({ inside, outside }: ISpaceDigester) => {
  const css: ICSSObject = {};
  if (inside !== undefined) {
    if (typeof inside === 'number') {
      css.padding = `${inside}px`;
    } else {
      const { top, right, bottom, left } = inside;
      css.padding = `${top || 0}px ${right || 0}px ${bottom || 0}px ${left ||
        0}px`;
    }
  }
  if (outside !== undefined) {
    if (typeof outside === 'number') {
      css.margin = `${outside}px`;
    } else {
      const { top, right, bottom, left } = outside;
      css.margin = `${top || 0}px ${right || 0}px ${bottom || 0}px ${left ||
        0}px`;
    }
  }
  return css;
};

/**
 * Shadow.
 */
export interface IShadowObjectDigester {
  color?: string;
  blur?: number;
  grow?: number;
  down?: number;
  across?: number;
}
export interface IShadowDigester {
  shadow?: IShadowObjectDigester | IShadowObjectDigester[];
}
export const digestShadow = ({ shadow }: IShadowDigester) => {
  if (shadow === undefined) {
    return {};
  }
  const shadows = Array.isArray(shadow) ? shadow : [shadow];
  const shade = shadows
    .map((item: IShadowObjectDigester) => {
      const { color = '#000', blur = 0, grow = 0, down = 0, across = 0 } = item;
      return `${across}px ${down}px ${blur}px ${grow}px ${color}`;
    })
    .join(', ');
  return {
    boxShadow: shade,
  };
};

/**
 * Corners.
 */
export interface ICornersObjectDigester {
  radius: number;
}
export interface ICornersDigester {
  corners?: number | ICornersObjectDigester;
}
export const digestCorners = ({ corners }: ICornersDigester) => {
  const css: ICSSObject = {};
  if (corners !== undefined) {
    if (typeof corners === 'number') {
      css.borderRadius = `${corners}px`;
    } else {
      const { radius = 0 } = corners;
      css.borderRadius = `${radius}px`;
    }
  }
  return css;
};

/**
 * Sizing.
 */
export interface ISizeObjectDigester {
  use?: number | string;
  min?: number | string;
  max?: number | string;
}
export interface ISizeDigester {
  width?: number | string | ISizeObjectDigester;
  height?: number | string | ISizeObjectDigester;
}
export const digestSize = ({ height, width }: ISizeDigester) => {
  const css: ICSSObject = {};
  if (width !== undefined) {
    if (typeof width === 'number' || typeof width === 'string') {
      css.width = formatValue(width);
    } else {
      if (width.min) {
        css.minWidth = formatValue(width.min);
      }
      if (width.max) {
        css.maxWidth = formatValue(width.max);
      }
      if (width.use) {
        css.width = formatValue(width.use);
      }
    }
  }
  if (height !== undefined) {
    if (typeof height === 'number' || typeof height === 'string') {
      css.height = formatValue(height);
    } else {
      if (height.min) {
        css.minHeight = formatValue(height.min);
      }
      if (height.max) {
        css.maxHeight = formatValue(height.max);
      }
      if (height.use) {
        css.height = formatValue(height.use);
      }
    }
  }
  return css;
};

/**
 * Diameter.
 */
export interface IDiameterDigester {
  diameter?: number;
}
export const digestDiameter = ({ diameter }: IDiameterDigester) => {
  if (diameter === undefined) {
    return {};
  }
  return {
    borderRadius: '50%',
    height: `${diameter}px`,
    width: `${diameter}px`,
  };
};

/**
 * Border.
 */
export interface IBorderObjectDigester {
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
  sides?:
    | 'top'
    | 'left'
    | 'bottom'
    | 'right'
    | Array<'top' | 'left' | 'bottom' | 'right'>;
}
export interface IBorderDigester {
  border?: IBorderObjectDigester | IBorderObjectDigester[];
}
const createBorder = (border: IBorderObjectDigester) => {
  let css: ICSSObject = {};
  if (border !== undefined) {
    const {
      color = '#000',
      thickness = 1,
      style = 'solid',
      sides = [],
    } = border;
    if (!sides.length) {
      css.border = `${thickness}px ${style} ${color}`;
    } else {
      const bordersides = Array.isArray(sides) ? sides : [sides];
      css = bordersides
        .filter(exists => exists)
        .map(side => (side as string).toLowerCase())
        .reduce((accum: any, side) => {
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
          return {
            ...accum,
            [`border${upperSide}`]: `${thickness}px ${style} ${color}`,
          };
        }, {});
    }
  }
  return css;
};
export const digestBorder = ({ border }: IBorderDigester) => {
  let css: ICSSObject = {};
  if (border !== undefined) {
    css = Array.isArray(border)
      ? border
          .map(createBorder)
          .reduce((accum, data) => ({ ...accum, ...data }), {})
      : createBorder(border);
  }
  return css;
};

/**
 * Flex direction.
 */
export interface IDirectionDigester {
  direction?: 'right' | 'left' | 'up' | 'down';
}
export const digestDirection = ({ direction }: IDirectionDigester) => {
  const css: ICSSObject = {};
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
  return css;
};

/**
 * Text.
 */
export interface ITextDigester {
  size?: number;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  family?: string;
  height?: number;
  boldness?: number;
  italic?: boolean;
  divide?: number;
  decoration?: {
    color?: string;
    style?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
    lines:
      | 'underline'
      | 'overline'
      | 'line-through'
      | Array<'underline' | 'overline' | 'line-through'>;
  };
}
export const digestText = ({
  size,
  color,
  align,
  family,
  height,
  boldness,
  italic,
  divide,
  decoration,
}: ITextDigester) => {
  const css: ICSSObject = {};
  if (size !== undefined) {
    css.fontSize = `${size}px`;
  }
  if (color !== undefined) {
    css.color = color;
  }
  if (align !== undefined) {
    css.textAlign = align;
  }
  if (family !== undefined) {
    css.fontFamily = family;
  }
  if (italic !== undefined) {
    css.fontStyle = 'italic';
  }
  if (divide !== undefined) {
    css.letterSpacing = `${divide}em`;
  }
  if (decoration !== undefined) {
    const { lines, style, color: decolor } = decoration;
    const delines = Array.isArray(lines) ? lines : [lines];
    css.textDecoration = `${[...delines, style, decolor].join(' ')}`;
  }
  /**
   * Numbers will be multiplied against the font size.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
   */
  if (height !== undefined) {
    css.lineHeight = `${height}em`;
  }
  /**
   * CSS Fonts work between 100 and 900.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Values
   */
  if (boldness !== undefined) {
    const min = 100;
    const max = 900;
    if (boldness < min || boldness > max) {
      const message = `In "<Text boldness={number} />": number must be between ${min} and ${max} inclusive but got "${boldness}".`;
      throw new Error(message);
    }
    css.fontWeight = boldness;
  }
  return css;
};

/**
 * Transforms.
 */
export interface ITransform3dDigester {
  x?: number | string;
  y?: number | string;
  z?: number | string;
}
export interface ITransformDigester {
  rotate?: number | string | ITransform3dDigester;
  scale?: number | ITransform3dDigester;
  translate?: number | ITransform3dDigester;
  transform?: {
    rotate?: number | string | ITransform3dDigester;
    scale?: number | ITransform3dDigester;
    translate?: number | ITransform3dDigester;
  };
}
const createTransform = (name: string, value: any): string => {
  if (typeof value === 'number' || typeof value === 'string') {
    return `${name}(${value})`;
  }
  return '';
};
const createRotateTransform = (
  rotate?: number | string | ITransform3dDigester
): string => {
  let transforms = '';
  if (rotate !== undefined) {
    transforms = createTransform(
      'rotate',
      typeof rotate === 'number' ? `${rotate}deg` : rotate
    );
    if (!transforms) {
      const { x, y, z } = rotate as ITransform3dDigester;
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
const createScaleTransform = (
  scale?: number | ITransform3dDigester
): string => {
  let transforms = '';
  if (scale !== undefined) {
    transforms = createTransform('scale', scale);
    if (!transforms) {
      const { x, y, z } = scale as ITransform3dDigester;
      transforms =
        z === undefined
          ? `scale(${x || 1}, ${y || 1})`
          : `scale3d(${x || 1}, ${y || 1}, ${z || 1})`;
    }
  }
  return transforms;
};
const createTranslateTransform = (
  translate?: number | ITransform3dDigester
): string => {
  let transforms = '';
  if (translate !== undefined) {
    transforms = createTransform('translate', translate);
    if (!transforms) {
      const { x, y, z } = translate as ITransform3dDigester;
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
export const digestTransform = ({
  transform,
  rotate,
  scale,
  translate,
}: ITransformDigester) => {
  const css: ICSSObject = {};
  css.transform = [
    createRotateTransform(transform && transform.rotate),
    createRotateTransform(rotate),
    createScaleTransform(transform && transform.scale),
    createScaleTransform(scale),
    createTranslateTransform(transform && transform.translate),
    createTranslateTransform(translate),
  ]
    .filter(exists => exists)
    .join(' ')
    .trim();
  return css;
};
