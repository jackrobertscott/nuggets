import { formatUnits } from '../utils/helpers';
import { ICSS, IUnit, IDigester, ISpace, IOptions } from '../utils/types';

export type IPadding = IOptions<ISpace & {}>;

export type IPaddingProps = boolean | IOptions<IUnit | IPadding>;

export const paddingDigester: IDigester<IPaddingProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'number' || typeof value === 'string') {
    css.padding = formatUnits(value);
  }
  if (typeof value === 'object') {
    const { size, sides, verts, top, right, bottom, left } = value;
    if (typeof size === 'string' || typeof size === 'number') {
      css.padding = formatUnits(size);
    }
    if (typeof verts === 'string' || typeof verts === 'number') {
      css.paddingTop = formatUnits(verts);
      css.paddingBottom = formatUnits(verts);
    }
    if (typeof sides === 'string' || typeof sides === 'number') {
      css.paddingRight = formatUnits(sides);
      css.paddingLeft = formatUnits(sides);
    }
    if (typeof top === 'string' || typeof top === 'number') {
      css.paddingTop = formatUnits(top);
    }
    if (typeof right === 'string' || typeof right === 'number') {
      css.paddingRight = formatUnits(right);
    }
    if (typeof bottom === 'string' || typeof bottom === 'number') {
      css.paddingBottom = formatUnits(bottom);
    }
    if (typeof left === 'string' || typeof left === 'number') {
      css.paddingLeft = formatUnits(left);
    }
  }
  return css;
};
