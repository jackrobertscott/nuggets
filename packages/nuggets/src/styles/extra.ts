import { ICSS, IDigester } from '../utils/types';
import { stringsAndPixels } from '../utils/helpers';

export interface IExtraDigester {
  transition?: number;
  cursor?: string;
}

export const digestExtra: IDigester<IExtraDigester> = ({
  transition,
  cursor,
}) => {
  const css: ICSS = {};
  if (transition !== undefined) {
    css.transition = stringsAndPixels(transition, 'ms');
  }
  if (cursor !== undefined) {
    css.cursor = cursor;
  }
  return css;
};
