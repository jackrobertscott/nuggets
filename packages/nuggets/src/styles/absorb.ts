import { formatUnits } from '../utils/helpers';
import { ICSS, IUnit, IDigester, ISpace, IOptions } from '../utils/types';

export type IAbsorb = IOptions<ISpace & {}>;

export type IAbsorbProps = boolean | IOptions<IUnit | IAbsorb>;

export const absorbDigester: IDigester<IAbsorbProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'number' || typeof value === 'string') {
    css.margin = `-${formatUnits(value)}`;
  }
  if (typeof value === 'object') {
    const { size, sides, verts, top, right, bottom, left } = value;
    if (typeof size === 'string' || typeof size === 'number') {
      css.margin = `-${formatUnits(size)}`;
    }
    if (typeof verts === 'string' || typeof verts === 'number') {
      css.marginTop = `-${formatUnits(verts)}`;
      css.marginBottom = `-${formatUnits(verts)}`;
    }
    if (typeof sides === 'string' || typeof sides === 'number') {
      css.marginRight = `-${formatUnits(sides)}`;
      css.marginLeft = `-${formatUnits(sides)}`;
    }
    if (typeof top === 'string' || typeof top === 'number') {
      css.marginTop = `-${formatUnits(top)}`;
    }
    if (typeof right === 'string' || typeof right === 'number') {
      css.marginRight = `-${formatUnits(right)}`;
    }
    if (typeof bottom === 'string' || typeof bottom === 'number') {
      css.marginBottom = `-${formatUnits(bottom)}`;
    }
    if (typeof left === 'string' || typeof left === 'number') {
      css.marginLeft = `-${formatUnits(left)}`;
    }
  }
  return css;
};
