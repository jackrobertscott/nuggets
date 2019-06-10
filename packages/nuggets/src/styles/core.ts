import { ICSS, IDigester, IUnit, IOptions } from '../utils/types';
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
}>;

export type ICoreProps = IOptions<ICore>;

export const coreDigester: IDigester<ICoreProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'object') {
    if (typeof value.zindex === 'string') {
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
  }
  return css;
};
