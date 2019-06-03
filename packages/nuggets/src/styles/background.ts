import { ICSS, IDigester } from '../utils/types';

export type IBackground = {
  color?: string | string[];
  angle?: number;
};

export type IBackgroundProps = string | IBackground;

export const backgroundDigester: IDigester<IBackgroundProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'string') {
    css.backgroundColor = value;
  }
  if (typeof value === 'object') {
    if (typeof value.color === 'string') {
      css.backgroundColor = value.color;
    } else if (Array.isArray(value.color)) {
      const colors = (value.color || []).join(', ');
      css.background = `linear-gradient(${value.angle || 0}deg, ${colors})`;
    }
  }
  return css;
};
