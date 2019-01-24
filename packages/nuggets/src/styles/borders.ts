import { ICSS, IDigester, IDirections } from '../utils/types';
import { stringsAndPixels } from '../utils/helpers';

export interface IBordersDigester {
  color?: string;
  thickness?: number;
  style?:
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';
  sides?: IDirections[];
}

export const digestBorders: IDigester<IBordersDigester> = ({
  color = '#000',
  thickness = 1,
  style = 'solid',
  sides = [],
}) => {
  const css: ICSS = {};
  if (sides.length) {
    const cssSides = sides
      .filter(exists => exists)
      .map(side => (side as string).toLowerCase())
      .reduce((accum: any, side) => {
        let props;
        const effects = `${stringsAndPixels(thickness)} ${style} ${color}`;
        switch (side) {
          case 'north':
            props = {
              'border-top': effects,
            };
            break;
          case 'east':
            props = {
              'border-right': effects,
            };
            break;
          case 'south':
            props = {
              'border-bottom': effects,
            };
            break;
          case 'west':
            props = {
              'border-left': effects,
            };
            break;
        }
        return {
          ...accum,
          ...props,
        };
      }, {});
    Object.assign(css, cssSides);
  } else {
    css.border = `${stringsAndPixels(thickness)} ${style} ${color}`;
  }
  return css;
};
