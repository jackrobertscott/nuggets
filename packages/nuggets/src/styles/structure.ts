import { ICSS, IDigester, IUnit, IDirections } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export interface IStructureDigester {
  direction?: IDirections;
  grow?: boolean;
  wrap?: boolean;
  divide?: IUnit;
  force?: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'even';
  align?: 'start' | 'end' | 'center' | 'stretch';
}

export const structureDigester: IDigester<IStructureDigester> = theme => ({
  direction,
  grow,
  wrap,
  divide,
  force,
  align,
}) => {
  const css: ICSS = {};
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
  if (grow !== undefined) {
    css.flexGrow = grow ? 1 : 0;
  }
  if (wrap !== undefined) {
    css.flexWrap = wrap ? 'wrap' : 'nowrap';
  }
  if (divide !== undefined) {
    const side =
      direction === 'left'
        ? 'Left'
        : direction === 'right'
        ? 'Right'
        : direction === 'up'
        ? 'Top'
        : 'Bottom';
    css['& > *'] = {
      [`margin${side}`]: formatUnits(divide),
      [':last-child']: {
        [`margin${side}`]: 0,
      },
    };
    if (wrap) {
      const wrapSide =
        direction === 'left' || direction === 'right' ? 'Bottom' : 'Right';
      (css['& > *'] as any)[`margin${wrapSide}`] = formatUnits(divide);
      css[`margin${wrapSide}`] = `-${formatUnits(divide)} !important`;
    }
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
  return css;
};
