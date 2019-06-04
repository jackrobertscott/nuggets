import { formatUnits } from '../utils/helpers';
import { ICSS, IUnit, IDigester } from '../utils/types';

export type IShadows = {
  color?: string;
  size?: IUnit;
  scale?: IUnit;
  down?: IUnit;
  across?: IUnit;
  inside?: boolean;
};

export type IShadowsProps = string | IShadows | IShadows[];

export const shadowsDigester: IDigester<IShadowsProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'string') {
    css.boxShadow = value;
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      const createShadow = (data: IShadows) => {
        return [
          data.inside ? 'inset' : '',
          data.across,
          data.down,
          data.size,
          data.scale,
          data.color,
        ]
          .map(i => formatUnits(i))
          .join(' ')
          .trim();
      };
      css.boxShadow = Array.isArray(value)
        ? value.map(createShadow).join(', ')
        : createShadow(value);
    }
  }
  return css;
};
