import { formatUnits } from '../utils/helpers';
import { ICSS, IUnit, IDigester, IOptions } from '../utils/types';

export type IShadows = IOptions<{
  color?: string;
  size?: IUnit;
  scale?: IUnit;
  down?: IUnit;
  across?: IUnit;
  inside?: boolean;
}>;

export type IShadowsProps = boolean | string | IOptions<IShadows | IShadows[]>;

export const shadowsDigester: IDigester<IShadowsProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'string') {
    css.boxShadow = value;
  }
  if (typeof value === 'object') {
    const createShadow = (data: IShadows) => {
      const shadow = [
        data.inside ? 'inset' : '',
        typeof data.across === 'string' || typeof data.across === 'number'
          ? formatUnits(data.across)
          : 0,
        typeof data.down === 'string' || typeof data.down === 'number'
          ? formatUnits(data.down)
          : 0,
        typeof data.size === 'string' || typeof data.size === 'number'
          ? formatUnits(data.size)
          : 0,
        typeof data.scale === 'string' || typeof data.scale === 'number'
          ? formatUnits(data.scale)
          : 0,
        data.color,
      ]
        .map(String)
        .map(i => i)
        .join(' ')
        .trim();
      return shadow;
    };
    css.boxShadow = Array.isArray(value)
      ? value
          .map(i => (typeof i === 'object' ? createShadow(i) : undefined))
          .filter(String)
          .join(', ')
      : createShadow(value);
  }
  return css;
};
