import { formatUnits } from '../utils/helpers';
import { ICSS, IUnit, IDigester, IOptions, ISides } from '../utils/types';

export type IBordersSides = { [sides in 'size' | ISides]?: IUnit };

export type IBorders = IOptions<
  IBordersSides & {
    color?: string;
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
  }
>;

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
    css.borderWidth = formatUnits(0);
    Object.keys(value)
      .filter(exists => {
        return typeof exists === 'number' || typeof exists === 'string';
      })
      .forEach(side => {
        const borderSize = formatUnits((value as any)[side]);
        switch (side) {
          case 'size':
            css.borderWidth = borderSize;
            break;
          case 'top':
            css.borderTopWidth = borderSize;
            break;
          case 'right':
            css.borderRightWidth = borderSize;
            break;
          case 'bottom':
            css.borderBottomWidth = borderSize;
            break;
          case 'left':
            css.borderLeftWidth = borderSize;
            break;
        }
      });
  }
  return css;
};
