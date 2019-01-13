import { ICSSObject } from './styles';

/**
 * Overrides.
 */
export interface IOverridesDigest {
  overrides?: ICSSObject;
}
export const digestOverrides = ({ overrides }: IOverridesDigest) => {
  if (overrides === undefined) {
    return {};
  }
  return overrides;
};

/**
 * Background color.
 */
export interface IBackgroundColorDigest {
  color?: string;
}
export const digestBackgroundColor = ({ color }: IBackgroundColorDigest) => {
  if (color === undefined) {
    return {};
  }
  return { backgroundColor: color };
};

/**
 * Padding.
 */
export interface IPaddingObjectDigest {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
export interface IPaddingDigest {
  padding?: number | IPaddingObjectDigest;
}
export const digestPadding = ({ padding }: IPaddingDigest) => {
  if (padding === undefined) {
    return {};
  }
  if (typeof padding === 'number') {
    return { padding: `${padding}px` };
  }
  const { top, right, bottom, left } = padding;
  return {
    padding: `${top || 0}px ${right || 0}px ${bottom || 0}px ${left || 0}px`,
  };
};

/**
 * Shadow.
 */
export interface IShadowObjectDigest {
  color?: string;
  blur?: number;
  grow?: number;
  down?: number;
  across?: number;
}
export interface IShadowDigest {
  shadow?: IShadowObjectDigest | IShadowObjectDigest[];
}
export const digestShadow = ({ shadow }: IShadowDigest) => {
  if (shadow === undefined) {
    return {};
  }
  const shadows = Array.isArray(shadow) ? shadow : [shadow];
  const shade = shadows
    .map((item: IShadowObjectDigest) => {
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
export interface ICornersObjectDigest {
  radius: number;
}
export interface ICornersDigest {
  corners?: ICornersObjectDigest;
}
export const digestCorners = ({ corners }: ICornersDigest) => {
  if (corners === undefined) {
    return {};
  }
  const { radius = 0 } = corners;
  return {
    borderRadius: `${radius}px`,
  };
};

/**
 * Border.
 */
export interface IBorderObjectDigest {
  color?: string;
  thickness?: number;
  style?: string;
  sides?: Array<'top' | 'left' | 'bottom' | 'right'>;
}
export interface IBorderDigest {
  border?: IBorderObjectDigest;
}
export const digestBorder = ({ border }: IBorderDigest) => {
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
export interface IDirectionDigest {
  direction?: 'right' | 'left' | 'up' | 'down';
}
export const digestDirection = ({ direction }: IDirectionDigest) => {
  let value;
  switch (direction) {
    default:
    case 'down':
      value = 'column';
      break;
    case 'up':
      value = 'column-reverse';
      break;
    case 'right':
      value = 'row';
      break;
    case 'left':
      value = 'row-reverse';
      break;
  }
  return { flexDirection: value };
};

/**
 * Text.
 */
export interface ITextDigest {
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
}: ITextDigest) => {
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
