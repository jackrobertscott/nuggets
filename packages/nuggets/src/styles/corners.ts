import {
  ICSS,
  IDigester,
  IDirections,
  IDirectionsDiagonals,
} from '../utils/types';
import { stringsAndPixels } from '../utils/helpers';

export interface ICornersDigester {
  radius?: number;
  points?: Array<IDirections | IDirectionsDiagonals>;
}

export const digestCorners: IDigester<ICornersDigester> = ({
  radius = 0,
  points = [],
}) => {
  const css: ICSS = {};
  if (radius !== undefined) {
    if (points.length) {
      const cssPoints = points
        .filter(exists => exists)
        .map(side => (side as string).toLowerCase())
        .reduce((accum: any, side) => {
          let props;
          const effects = stringsAndPixels(radius);
          switch (side) {
            case 'north':
              props = {
                'border-top-right-radius': effects,
                'border-top-left-radius': effects,
              };
              break;
            case 'east':
              props = {
                'border-top-right-radius': effects,
                'border-bottom-right-radius': effects,
              };
              break;
            case 'south':
              props = {
                'border-bottom-right-radius': effects,
                'border-bottom-left-radius': effects,
              };
              break;
            case 'west':
              props = {
                'border-top-left-radius': effects,
                'border-bottom-left-radius': effects,
              };
              break;
            case 'northeast':
              props = {
                'border-top-right-radius': effects,
              };
              break;
            case 'northwest':
              props = {
                'border-top-left-radius': effects,
              };
              break;
            case 'southeast':
              props = {
                'border-bottom-right-radius': effects,
              };
              break;
            case 'southwest':
              props = {
                'border-bottom-left-radius': effects,
              };
              break;
          }
          return {
            ...accum,
            ...props,
          };
        }, {});
      Object.assign(css, cssPoints);
    } else {
      css.borderRadius = stringsAndPixels(radius);
    }
  }
  return css;
};
