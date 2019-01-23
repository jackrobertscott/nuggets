import { ICSSObject, IDigester, stringsAndPixels } from '../utils/styles';

export interface ICornersDigester {
  radius: number;
}

export const digestCorners: IDigester<ICornersDigester> = ({ radius = 0 }) => {
  const css: ICSSObject = {};
  if (radius !== undefined) {
    css.borderRadius = stringsAndPixels(radius);
  }
  return css;
};
