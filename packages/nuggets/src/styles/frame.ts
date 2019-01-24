import { ICSS, IDigester, IDirections } from '../utils/types';
import { stringsAndPixels } from '../utils/helpers';

export interface ISpaceOptions {
  north?: number;
  south?: number;
  east?: number;
  west?: number;
  sides?: number;
  verts?: number;
}

export interface IFrameDigester {
  direction?: IDirections;
  force?: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'even';
  space?: number | ISpaceOptions;
}

export const digestFrame: IDigester<IFrameDigester> = ({
  direction,
  force,
  space,
}) => {
  const css: ICSS = {
    flexGrow: 1,
    display: 'flex',
    overflow: 'auto',
  };
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
  if (force !== undefined) {
    switch (force) {
      default:
      case 'stretch':
        css.justifyContent = 'stretch';
        break;
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
        css.paddingSouth = stringsAndPixels(south);
      }
      if (west) {
        css.paddingLeft = stringsAndPixels(west);
      }
    }
  }
  return css;
};
