import { ICSS, IDigester, IDirections } from '../utils/types';
import { stringsAndPixels } from '../utils/helpers';

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

export interface IFrameDigester {
  direction?: IDirections;
  align?: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'even';
  space?: number | ISpaceOptions;
  between?: number | string;
  diameter?: number;
  width?: number | string | ISizeOptions;
  height?: number | string | ISizeOptions;
  grow?: boolean;
}

export const digestFrame: IDigester<IFrameDigester> = ({
  direction,
  between,
  align,
  space,
  diameter,
  height,
  width,
  grow,
}) => {
  const css: ICSS = {};
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
  if (align !== undefined) {
    switch (align) {
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
  if (space !== undefined) {
    if (typeof space === 'number') {
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
  if (diameter !== undefined) {
    css.borderRadius = '50%';
    css.height = stringsAndPixels(diameter);
    css.width = stringsAndPixels(diameter);
  }
  if (grow !== undefined) {
    css.flexGrow = grow ? 1 : 0;
  }
  if (width !== undefined) {
    css.flexGrow = 0;
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
  return css;
};
