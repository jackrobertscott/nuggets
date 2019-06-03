import { ICSS, IDigester, ISpace, IUnit } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export type IPosition = {
  exact?: IUnit | ISpace;
};

export type IPositionProps = IPosition;

export const positionDigester: IDigester<IPositionProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'object') {
    if (typeof value.exact === 'string' || typeof value.exact === 'number') {
      css.position = 'absolute';
      css.margin = 0;
      css.top = formatUnits(value.exact);
      css.right = formatUnits(value.exact);
      css.bottom = formatUnits(value.exact);
      css.left = formatUnits(value.exact);
    }
    if (typeof value.exact === 'object') {
      css.position = 'absolute';
      css.margin = 0;
      const { all, top, right, bottom, left, sides, verts } = value.exact;
      if (typeof all === 'string' || typeof all === 'number') {
        css.top = formatUnits(all);
        css.right = formatUnits(all);
        css.bottom = formatUnits(all);
        css.left = formatUnits(all);
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
  }
  return css;
};
