import { formatUnits } from '../utils/helpers';
import { ICSS, IUnit, IDigester, IOptions } from '../utils/types';

export type IBordersSides = IOptions<{
  top?: IUnit;
  bottom?: IUnit;
  right?: IUnit;
  left?: IUnit;
}>;

export type IBorders = IOptions<{
  color?: string;
  sides?: IUnit | IBordersSides;
  style?:
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset'
    | string;
}>;

export type IBordersProps = boolean | string | number | IOptions<IBorders>;

export const bordersDigester: IDigester<IBordersProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'string') {
    css.borderColor = value;
    css.borderStyle = 'solid';
    css.borderWidth = formatUnits(1);
  }
  if (typeof value === 'number') {
    css.borderColor = '#000';
    css.borderStyle = 'solid';
    css.borderWidth = formatUnits(value);
  }
  if (typeof value === 'object') {
    css.borderColor = typeof value.color === 'string' ? value.color : '#000';
    css.borderStyle = typeof value.style === 'string' ? value.style : 'solid';
    css.borderWidth = formatUnits(1);
    if (typeof value.sides === 'number' || typeof value.sides === 'string') {
      css.borderWidth = formatUnits(value.sides);
    }
    if (typeof value.sides === 'object') {
      css.borderWidth = formatUnits(0);
      Object.keys(value.sides)
        .filter(exists => {
          return typeof exists === 'number' || typeof exists === 'string';
        })
        .forEach(side => {
          const sideSize = formatUnits((value.sides as any)[side]);
          switch (side) {
            case 'top':
              css.borderTopWidth = sideSize;
              break;
            case 'right':
              css.borderRightWidth = sideSize;
              break;
            case 'bottom':
              css.borderBottomWidth = sideSize;
              break;
            case 'left':
              css.borderLeftWidth = sideSize;
              break;
          }
        });
    }
  }
  return css;
};
