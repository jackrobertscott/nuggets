import { ICSS, IDigester, IUnit, IDirections } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export interface IContentsOverflow {
  down?: string;
  across?: string;
}

export interface IContents {
  direction?: IDirections;
  overflow?: string | IContentsOverflow;
  wrap?: boolean;
  divide?: IUnit;
  align?: 'start' | 'end' | 'center' | 'stretch' | string;
  arrange?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'between'
    | 'even'
    | string;
}

export type IContentsProps = IContents;

export const contentsDigester: IDigester<IContentsProps> = value => {
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
    if (typeof value.overflow === 'string') {
      css.overflow = value.overflow;
    }
    if (typeof value.overflow === 'object') {
      css.overflowY = value.overflow.down;
      css.overflowX = value.overflow.across;
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
  }
  return css;
};
