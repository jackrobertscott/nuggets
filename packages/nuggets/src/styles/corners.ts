import { formatUnits } from '../utils/helpers';
import {
  ICSS,
  IUnit,
  IDigester,
  IDiagonals,
  ISides,
  IOptions,
} from '../utils/types';

export type ICorners = IOptions<
  { [sides in 'size' | ISides | IDiagonals]?: IUnit }
>;

export type ICornersProps = boolean | IOptions<IUnit | ICorners>;

export const cornersDigester: IDigester<ICornersProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'number' || typeof value === 'string') {
    css.borderRadius = formatUnits(value);
  }
  if (typeof value === 'object') {
    Object.keys(value)
      .filter(exists => {
        return typeof exists === 'number' || typeof exists === 'string';
      })
      .forEach(side => {
        const radiusSize = formatUnits((value as any)[side]);
        switch (side) {
          case 'size':
            css.borderRadius = radiusSize;
            break;
          case 'top':
            css.borderTopRightRadius = radiusSize;
            css.borderTopLeftRadius = radiusSize;
            break;
          case 'right':
            css.borderTopRightRadius = radiusSize;
            css.borderBottomRightRadius = radiusSize;
            break;
          case 'bottom':
            css.borderBottomRightRadius = radiusSize;
            css.borderBottomLeftRadius = radiusSize;
            break;
          case 'left':
            css.borderTopLeftRadius = radiusSize;
            css.borderBottomLeftRadius = radiusSize;
            break;
          case 'topRight':
            css.borderTopRightRadius = radiusSize;
            break;
          case 'topLeft':
            css.borderTopLeftRadius = radiusSize;
            break;
          case 'bottomRight':
            css.borderBottomRightRadius = radiusSize;
            break;
          case 'bottomLeft':
            css.borderBottomLeftRadius = radiusSize;
            break;
        }
      });
  }
  return css;
};
