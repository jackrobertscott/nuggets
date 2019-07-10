import { ICSS, IDigester, IUnit, IOptions, IDirections } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export type ICoreOverflow = IOptions<{
  down?: string;
  across?: string;
}>;

export type ICore = IOptions<{
  zindex?: number;
  transition?: IUnit;
  cursor?: string;
  events?: string;
  alpha?: number;
  order?: number;
  overflow?: string | ICoreOverflow;
  direction?: IDirections;
  grow?: boolean | number;
  shrink?: boolean | number;
  basis?: boolean | number;
  collapse?: boolean;
  wrap?: boolean;
  divide?: IUnit;
  important?: boolean;
  align?: 'start' | 'end' | 'center' | 'stretch' | string;
  arrange?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'between'
    | 'even'
    | string;
}>;

export type ICoreProps = IOptions<ICore>;

export const coreDigester: IDigester<ICoreProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'object') {
    if (typeof value.zindex === 'number') {
      css.zIndex = value.zindex;
    }
    if (
      typeof value.transition === 'string' ||
      typeof value.transition === 'number'
    ) {
      css.transition = formatUnits(value.transition, 'ms');
    }
    if (typeof value.cursor === 'string') {
      css.cursor = value.cursor;
    }
    if (typeof value.events === 'string') {
      css.pointerEvents = value.events;
    }
    if (typeof value.alpha === 'number') {
      if (value.alpha > 1 || value.alpha < 0) {
        const message = `The "alpha" property must be between 0 and 1 inclusive, but got "${
          value.alpha
        }".`;
        throw new Error(message);
      }
      css.opacity = value.alpha;
    }
    if (typeof value.order === 'number') {
      css.order = value.order;
    }
    if (typeof value.overflow === 'string') {
      css.overflow = value.overflow;
    }
    if (typeof value.overflow === 'object') {
      if (typeof value.overflow.down === 'string') {
        css.overflowY = value.overflow.down;
      }
      if (typeof value.overflow.across === 'string') {
        css.overflowX = value.overflow.across;
      }
    }
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
    if (typeof value.grow === 'number') {
      css.flexGrow = value.grow;
    }
    if (typeof value.shrink === 'boolean') {
      css.flexShrink = value.shrink ? 1 : 0;
    }
    if (typeof value.shrink === 'number') {
      css.flexShrink = value.shrink;
    }
    if (typeof value.basis === 'boolean') {
      css.flexBasis = value.basis ? 1 : 0;
    }
    if (typeof value.basis === 'number') {
      css.flexBasis = value.basis;
    }
    if (typeof value.collapse === 'boolean') {
      if (value.collapse) {
        css.width = 'fit-content';
      }
    }
    if (typeof value.wrap === 'boolean') {
      css.flexWrap = value.wrap ? 'wrap' : 'nowrap';
    }
    if (typeof value.divide === 'string' || typeof value.divide === 'number') {
      const ensure = value.important ? ' !important' : '';
      const side =
        value.direction === 'left'
          ? 'Left'
          : value.direction === 'right'
          ? 'Right'
          : value.direction === 'up'
          ? 'Top'
          : 'Bottom';
      css['& > *'] = {
        [`margin${side}`]: `${formatUnits(value.divide)}${ensure}`,
        [':last-child']: {
          [`margin${side}`]: `${0}${ensure}`,
        },
      };
      if (value.wrap) {
        const wrapSide =
          value.direction === 'left' || value.direction === 'right'
            ? 'Bottom'
            : 'Right';
        (css['& > *'] as any)[`margin${wrapSide}`] = formatUnits(value.divide);
        css[`margin${wrapSide}`] = `-${formatUnits(value.divide)}${ensure}`;
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
