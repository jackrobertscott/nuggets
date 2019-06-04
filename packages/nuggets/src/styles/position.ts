import { ICSS, IDigester, ISpace, IUnit } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export type IPosition = {
  absolute?: IUnit | ISpace;
  absorb?: IUnit | ISpace;
};

export type IPositionProps = IPosition;

export const positionDigester: IDigester<IPositionProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'object') {
    if (
      typeof value.absolute === 'string' ||
      typeof value.absolute === 'number'
    ) {
      css.position = 'absolute';
      css.margin = 0;
      css.top = formatUnits(value.absolute);
      css.right = formatUnits(value.absolute);
      css.bottom = formatUnits(value.absolute);
      css.left = formatUnits(value.absolute);
    }
    if (typeof value.absolute === 'object') {
      css.position = 'absolute';
      css.margin = 0;
      const { all, top, right, bottom, left, sides, verts } = value.absolute;
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
    if (typeof value.absorb === 'number' || typeof value.absorb === 'string') {
      css.margin = `-${formatUnits(value.absorb)}`;
    }
    if (typeof value.absorb === 'object') {
      const { all, sides, verts, top, right, bottom, left } = value.absorb;
      if (typeof all === 'string' || typeof all === 'number') {
        css.margin = `-${formatUnits(all)}`;
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
  }
  return css;
};
