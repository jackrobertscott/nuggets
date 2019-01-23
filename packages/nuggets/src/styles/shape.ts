import { ICSS, IDigester } from '../utils/types';
import { stringsAndPixels } from '../utils/helpers';

export interface ISizeOptions {
  use?: number | string;
  min?: number | string;
  max?: number | string;
}

export interface ISpaceOptions {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  sides?: number;
  verts?: number;
}

export interface IShapeDigester {
  color?: string;
  diameter?: number;
  width?: number | string | ISizeOptions;
  height?: number | string | ISizeOptions;
  space?: number | ISpaceOptions;
}

export const digestShape: IDigester<IShapeDigester> = ({
  color,
  diameter,
  height,
  width,
  space,
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
  if (space !== undefined) {
    if (typeof space === 'number') {
      css.padding = stringsAndPixels(space);
    } else {
      const { top, right, bottom, left, sides, verts } = space;
      const sizes = {
        top: stringsAndPixels(top || verts || 0),
        right: stringsAndPixels(right || sides || 0),
        bottom: stringsAndPixels(bottom || verts || 0),
        left: stringsAndPixels(left || sides || 0),
      };
      css.padding = `${sizes.top} ${sizes.right} ${sizes.bottom} ${sizes.left}`;
    }
  }
  return css;
};
