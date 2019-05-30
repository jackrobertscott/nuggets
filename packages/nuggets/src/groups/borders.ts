import { createDigester } from '../utils/digester';
import { formatUnits } from '../utils/helpers';
import { ICSS, IUnit } from '../utils/types';

export interface IBordersSides {
  top?: IUnit;
  bottom?: IUnit;
  right?: IUnit;
  left?: IUnit;
}

export type IBorders =
  | string
  | {
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
        | 'outset';
    };

export const bordersDigester = createDigester<IBorders>({
  css: value => {
    const css = {} as ICSS;
    if (typeof value === 'string') {
      css.borderColor = value;
      css.borderStyle = 'solid';
      css.borderWidth = formatUnits(1);
    }
    if (typeof value === 'object') {
      css.borderColor = value.color;
      css.borderStyle = value.style || 'solid';
      css.borderWidth = formatUnits(1);
      if (typeof value.sides === 'number' || typeof value.sides === 'string') {
        css.borderWidth = formatUnits(value.sides);
      }
      if (typeof value.sides === 'object') {
        css.borderWidth = formatUnits(0);
        Object.keys(value.sides)
          .filter(exists => exists)
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
  },
});
