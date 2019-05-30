import { ICSS, IDigester, IUnit, IDirections } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export interface IStructure {
  direction?: IDirections;
  grow?: boolean;
  wrap?: boolean;
  divide?: IUnit;
  arrange?: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'even';
  align?: 'start' | 'end' | 'center' | 'stretch';
}

export type IStructureProps = IStructure;

export const structureDigester: IDigester<IStructureProps> = value => {
  const css: ICSS = {};
  if (typeof value === 'object') {
    if (typeof value.direction === 'string') {
      switch (value.direction) {
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
    if (typeof value.grow === 'boolean') {
      css.flexGrow = value.grow ? 1 : 0;
    }
    if (typeof value.wrap === 'boolean') {
      css.flexWrap = value.wrap ? 'wrap' : 'nowrap';
    }
    if (typeof value.divide === 'string' || typeof value.divide === 'number') {
      const side =
        value.direction === 'left'
          ? 'Left'
          : value.direction === 'right'
          ? 'Right'
          : value.direction === 'up'
          ? 'Top'
          : 'Bottom';
      css['& > *'] = {
        [`margin${side}`]: `${formatUnits(value.divide)} !important`,
        [':last-child']: {
          [`margin${side}`]: `${0} !important`,
        },
      };
      if (value.wrap) {
        const wrapSide =
          value.direction === 'left' || value.direction === 'right'
            ? 'Bottom'
            : 'Right';
        (css['& > *'] as any)[`margin${wrapSide}`] = formatUnits(value.divide);
        css[`margin${wrapSide}`] = `-${formatUnits(value.divide)} !important`;
      }
    }
    if (typeof value.arrange === 'string') {
      switch (value.arrange) {
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
    if (typeof value.align === 'string') {
      switch (value.align) {
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
  }
  return css;
};
