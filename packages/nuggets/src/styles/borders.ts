import { ICSSObject } from '../utils/styles';

export interface IBorderObjectDigester {
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

export interface IBorderDigester {
  border?: IBorderObjectDigester | IBorderObjectDigester[];
}

const createBorder = (border: IBorderObjectDigester) => {
  let css: ICSSObject = {};
  if (border !== undefined) {
    const {
      color = '#000',
      thickness = 1,
      style = 'solid',
      sides = [],
    } = border;
    if (!sides.length) {
      css.border = `${thickness}px ${style} ${color}`;
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
            [`border${upperSide}`]: `${thickness}px ${style} ${color}`,
          };
        }, {});
    }
  }
  return css;
};

export const digestBorder = ({ border }: IBorderDigester) => {
  let css: ICSSObject = {};
  if (border !== undefined) {
    css = Array.isArray(border)
      ? border
          .map(createBorder)
          .reduce((accum, data) => ({ ...accum, ...data }), {})
      : createBorder(border);
  }
  return css;
};
