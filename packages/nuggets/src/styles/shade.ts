import { IDigester, ICSSObject } from '../utils/styles';

export interface IShadeDigester {
  color?: string;
  blur?: number;
  grow?: number;
  down?: number;
  across?: number;
}

export const digestShade: IDigester<IShadeDigester> = ({
  color = '#000',
  blur = 0,
  grow = 0,
  down = 0,
  across = 0,
}) => {
  const css: ICSSObject = {};
  css.boxShadow = `${across}px ${down}px ${blur}px ${grow}px ${color}`;
  return css;
};
