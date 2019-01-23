import { ICSSObject, formatValue } from '../utils/styles';

export interface IBackgroundColorDigester {
  color?: string;
}

export const digestBackgroundColor = ({ color }: IBackgroundColorDigester) => {
  if (color === undefined) {
    return {};
  }
  return { backgroundColor: color };
};

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

export interface ISpaceObjectDigester {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  sides?: number;
  verts?: number;
}

export interface ISpaceDigester {
  inside?: number | ISpaceObjectDigester;
}

export const digestSpace = ({ inside }: ISpaceDigester) => {
  const css: ICSSObject = {};
  if (inside !== undefined) {
    if (typeof inside === 'number') {
      css.padding = `${inside}px`;
    } else {
      const { top, right, bottom, left, sides, verts } = inside;
      css.padding = `${top || verts || 0}px ${right || sides || 0}px ${bottom ||
        verts ||
        0}px ${left || sides || 0}px`;
    }
  }
  return css;
};
