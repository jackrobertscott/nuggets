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

export type IShadowsProps = IOptions<string | IShadows | IShadows[]>;

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
          .map(String)
          .map(i => formatUnits(i))
          .join(' ')
          .trim();
      };
      css.boxShadow = Array.isArray(value)
        ? value
            .map(i => (typeof i === 'object' ? createShadow(i) : undefined))
            .filter(String)
            .join(', ')
        : createShadow(value);
    }
  }
  return css;
};
