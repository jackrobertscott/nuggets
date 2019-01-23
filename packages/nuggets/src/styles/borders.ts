import { ICSSObject, IDigester, stringsAndPixels } from '../utils/styles';

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
  sides?:
    | 'top'
    | 'left'
    | 'bottom'
    | 'right'
    | Array<'top' | 'left' | 'bottom' | 'right'>;
}

export const digestBorders: IDigester<IBordersDigester> = ({
  color = '#000',
  thickness = 1,
  style = 'solid',
  sides = [],
}) => {
  let css: ICSSObject = {};
  if (sides && !sides.length) {
    css.border = `${stringsAndPixels(thickness)} ${style} ${color}`;
  } else {
    const bordersides = Array.isArray(sides) ? sides : [sides];
    css = bordersides
      .filter(exists => exists)
      .map(side => (side as string).toLowerCase())
      .reduce((accum: any, side) => {
        let upperSide;
        switch (side) {
          case 'top':
            upperSide = 'Top';
            break;
          case 'bottom':
            upperSide = 'Bottom';
            break;
          case 'left':
            upperSide = 'Left';
            break;
          case 'right':
            upperSide = 'Right';
            break;
          default:
            break;
        }
        return {
          ...accum,
          [`border${upperSide}`]: `${stringsAndPixels(
            thickness
          )} ${style} ${color}`,
        };
      }, {});
  }
  return css;
};
