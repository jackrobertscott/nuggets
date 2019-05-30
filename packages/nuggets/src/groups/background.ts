import { createDigester } from '../utils/digester';
import { ICSS } from '../utils/types';

export type IBackground =
  | string
  | {
      color?: string | string[];
      angle?: number;
    };

export const backgroundDigester = createDigester<IBackground>({
  css: value => {
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
  },
});
