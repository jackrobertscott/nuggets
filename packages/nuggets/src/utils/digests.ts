import { ICSSObject } from './styles';

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
export interface ISizeDigester {
  width?: number;
  height?: number;
}
export const digestSize = ({ height, width }: ISizeDigester) => {
  const size: ICSSObject = {};
  if (width !== undefined) {
    size.width = `${width}px`;
  }
  if (height !== undefined) {
    size.height = `${height}px`;
  }
  return size;
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
  style?: string;
  sides?: Array<'top' | 'left' | 'bottom' | 'right'>;
}
export interface IBorderDigester {
  border?: IBorderObjectDigester;
}
export const digestBorder = ({ border }: IBorderDigester) => {
  if (border === undefined) {
    return {};
  }
  const { color = '#000', thickness = 1, style = 'solid', sides = [] } = border;
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
}
export const digestText = ({
  size,
  color,
  align,
  family,
  height,
  boldness,
}: ITextDigester) => {
  const css = {};
  if (size !== undefined) {
    Object.assign(css, { fontSize: `${size}px` });
  }
  if (color !== undefined) {
    Object.assign(css, { color });
  }
  if (align !== undefined) {
    Object.assign(css, { textAlign: align });
  }
  if (family !== undefined) {
    Object.assign(css, { fontFamily: family });
  }
  /**
   * Numbers will be multiplied against the font size.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
   */
  if (height !== undefined) {
    Object.assign(css, { lineHeight: height });
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
    Object.assign(css, { fontWeight: boldness });
  }
  return css;
};

/**
 * Transforms.
 */
export interface ITransformRotateDigester {
  x?: number | string;
  y?: number | string;
  z?: number | string;
}
export interface ITransformDigester {
  rotate?: number | string | ITransformRotateDigester;
  transform?: {
    rotate?: number | string | ITransformRotateDigester;
  };
}
const createTransform = (name: string, value: any): string => {
  if (typeof value === 'number') {
    return `${name}(${value}deg)`;
  } else if (typeof value === 'string') {
    return `${name}(${value})`;
  }
  return '';
};
const createRotateTransform = (
  rotate?: number | string | ITransformRotateDigester
): string => {
  let transforms = '';
  if (rotate !== undefined) {
    const next = createTransform('rotate', rotate);
    if (next) {
      transforms = [transforms, next].join(' ').trim();
    } else {
      const { x, y, z } = rotate as ITransformRotateDigester;
      transforms = [
        transforms,
        createTransform('rotateX', x),
        createTransform('rotateY', y),
        createTransform('rotateZ', z),
      ]
        .filter(exists => exists)
        .join(' ')
        .trim();
    }
  }
  return transforms;
};
export const digestTransform = ({ transform, rotate }: ITransformDigester) => {
  const css: ICSSObject = {};
  css.transform = [
    createRotateTransform(transform && transform.rotate),
    createRotateTransform(rotate),
  ]
    .filter(exists => exists)
    .join(' ')
    .trim();
  return css;
};
