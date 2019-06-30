import { ICSS, IDigester, IUnit, IOptions } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export type IBackgroundSize = IOptions<{
  use?: IUnit;
  min?: IUnit;
  max?: IUnit;
}>;

export type IBackground = IOptions<{
  color?: string | string[];
  angle?: number;
  size?: IUnit;
  circle?: boolean;
  width?: IUnit | IBackgroundSize;
  height?: IUnit | IBackgroundSize;
}>;

export type IBackgroundProps =
  | boolean
  | string
  | number
  | IOptions<IBackground>;

export const backgroundDigester: IDigester<IBackgroundProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'string') {
    css.backgroundColor = value;
  }
  if (typeof value === 'number') {
    css.width = formatUnits(value);
    css.height = formatUnits(value);
  }
  if (typeof value === 'object') {
    if (typeof value.color === 'string') {
      css.backgroundColor = value.color;
    } else if (Array.isArray(value.color)) {
      const colors = (value.color || []).join(', ');
      css.background = `linear-gradient(${value.angle || 0}deg, ${colors})`;
    }
    if (typeof value.size === 'number' || typeof value.size === 'string') {
      css.width = formatUnits(value.size);
      css.height = formatUnits(value.size);
    }
    if (typeof value.circle === 'boolean') {
      if (value.circle) {
        css.borderRadius = '50%';
      }
    }
    if (typeof value.width === 'number' || typeof value.width === 'string') {
      css.width = formatUnits(value.width);
    }
    if (typeof value.width === 'object') {
      const { min, max, use } = value.width;
      if (typeof min === 'string' || typeof min === 'number') {
        css.minWidth = formatUnits(min);
      }
      if (typeof max === 'string' || typeof max === 'number') {
        css.maxWidth = formatUnits(max);
      }
      if (typeof use === 'string' || typeof use === 'number') {
        css.width = formatUnits(use);
      }
    }
    if (typeof value.height === 'number' || typeof value.height === 'string') {
      css.height = formatUnits(value.height);
    }
    if (typeof value.height === 'object') {
      const { min, max, use } = value.height;
      if (typeof min === 'string' || typeof min === 'number') {
        css.minHeight = formatUnits(min);
      }
      if (typeof max === 'string' || typeof max === 'number') {
        css.maxHeight = formatUnits(max);
      }
      if (typeof use === 'string' || typeof use === 'number') {
        css.height = formatUnits(use);
      }
    }
  }
  return css;
};
