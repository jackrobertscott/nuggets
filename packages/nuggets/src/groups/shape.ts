import { ICSS, IDigester, IUnit, ISpace } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export interface IShapeSize {
  use?: IUnit;
  min?: IUnit;
  max?: IUnit;
}

export type IShape = {
  size?: IUnit;
  circle?: boolean;
  collapse?: boolean;
  width?: IUnit | IShapeSize;
  height?: IUnit | IShapeSize;
  padding?: IUnit | ISpace;
  absorb?: IUnit | ISpace;
};

export type IShapeProps = IShape;

export const shapeDigester: IDigester<IShapeProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'object') {
    if (typeof value.size === 'number' || typeof value.size === 'string') {
      css.width = formatUnits(value.size);
      css.height = formatUnits(value.size);
    }
    if (typeof value.circle === 'boolean') {
      if (value.circle) {
        css.borderRadius = '50%';
      }
    }
    if (typeof value.collapse === 'boolean') {
      if (value.collapse) {
        css.width = 'fit-content';
      }
    }
    if (typeof value.width === 'number' || typeof value.width === 'string') {
      css.width = formatUnits(value.width);
    }
    if (typeof value.width === 'object') {
      const { min, max, use } = value.width;
      if (min) {
        css.minWidth = formatUnits(min);
      }
      if (max) {
        css.maxWidth = formatUnits(max);
      }
      if (use) {
        css.width = formatUnits(use);
      }
    }
    if (typeof value.height === 'number' || typeof value.height === 'string') {
      css.height = formatUnits(value.height);
    }
    if (typeof value.height === 'object') {
      const { min, max, use } = value.height;
      if (min) {
        css.minHeight = formatUnits(min);
      }
      if (max) {
        css.maxHeight = formatUnits(max);
      }
      if (use) {
        css.height = formatUnits(use);
      }
    }
    if (
      typeof value.padding === 'number' ||
      typeof value.padding === 'string'
    ) {
      css.padding = formatUnits(value.padding);
    }
    if (typeof value.padding === 'object') {
      const { all, sides, verts, top, right, bottom, left } = value.padding;
      if (typeof all === 'string' || typeof all === 'number') {
        css.padding = formatUnits(all);
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
