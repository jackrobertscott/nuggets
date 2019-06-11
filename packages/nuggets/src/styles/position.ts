import { ICSS, IDigester, ISpace, IUnit, IOptions } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export type IPosition = IOptions<
  ISpace & {
    effect?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
  }
>;

export type IPositionProps = boolean | IOptions<IUnit | IPosition>;

export const positionDigester: IDigester<IPositionProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'string' || typeof value === 'number') {
    css.margin = 0;
    css.position = 'absolute';
    css.top = formatUnits(value);
    css.right = formatUnits(value);
    css.bottom = formatUnits(value);
    css.left = formatUnits(value);
  }
  if (typeof value === 'object') {
    css.margin = 0;
    css.position = 'absolute';
    const { effect, size, top, right, bottom, left, sides, verts } = value;
    if (typeof effect === 'object') {
      css.position = effect;
    }
    if (typeof size === 'string' || typeof size === 'number') {
      css.top = formatUnits(size);
      css.right = formatUnits(size);
      css.bottom = formatUnits(size);
      css.left = formatUnits(size);
    }
    if (typeof verts === 'string' || typeof verts === 'number') {
      css.top = formatUnits(verts);
      css.bottom = formatUnits(verts);
    }
    if (typeof sides === 'string' || typeof sides === 'number') {
      css.right = formatUnits(sides);
      css.left = formatUnits(sides);
    }
    if (typeof top === 'string' || typeof top === 'number') {
      css.top = formatUnits(top);
    }
    if (typeof right === 'string' || typeof right === 'number') {
      css.right = formatUnits(right);
    }
    if (typeof bottom === 'string' || typeof bottom === 'number') {
      css.bottom = formatUnits(bottom);
    }
    if (typeof left === 'string' || typeof left === 'number') {
      css.left = formatUnits(left);
    }
  }
  return css;
};
