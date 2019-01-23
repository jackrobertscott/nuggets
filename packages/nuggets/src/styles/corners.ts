import { ICSS, IDigester } from '../utils/types';
import { stringsAndPixels } from '../utils/helpers';

export interface ICornersDigester {
  radius: number;
}

export const digestCorners: IDigester<ICornersDigester> = ({ radius = 0 }) => {
  const css: ICSS = {};
  if (radius !== undefined) {
    css.borderRadius = stringsAndPixels(radius);
  }
  return css;
};
