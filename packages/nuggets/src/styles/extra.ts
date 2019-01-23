import { stringsAndPixels, ICSSObject, IDigester } from '../utils/styles';

export interface IExtraDigester {
  transition?: number;
  cursor?: string;
}

export const digestExtra: IDigester<IExtraDigester> = ({
  transition,
  cursor,
}) => {
  const css: ICSSObject = {};
  if (transition !== undefined) {
    css.transition = stringsAndPixels(transition, 'ms');
  }
  if (cursor !== undefined) {
    css.cursor = cursor;
  }
  return css;
};
