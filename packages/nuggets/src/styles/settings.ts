import { ICSS, IDigester, IUnit } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export interface ISettingsOverflow {
  down?: string;
  across?: string;
}

export type ISettings = {
  zindex?: number;
  transition?: IUnit;
  cursor?: string;
  overflow?: string | ISettingsOverflow;
  events?: string;
  alpha?: number;
};

export type ISettingsProps = ISettings;

export const settingsDigester: IDigester<ISettingsProps> = value => {
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
    if (typeof value.overflow === 'string') {
      css.overflow = value.overflow;
    }
    if (typeof value.overflow === 'object') {
      css.overflowY = value.overflow.down;
      css.overflowX = value.overflow.across;
    }
    if (typeof value.events === 'string') {
      css.pointerEvents = value.events;
    }
    if (typeof value.alpha === 'number') {
      if (value.alpha > 1 || value.alpha < 0) {
        const message = `The "shape.alpha" property must be between 0 and 1 inclusive, but got "${
          value.alpha
        }".`;
        throw new Error(message);
      }
      css.opacity = value.alpha;
    }
  }
  return css;
};
