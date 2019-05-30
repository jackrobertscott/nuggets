import { createDigester } from '../utils/digester';
import { formatUnits } from '../utils/helpers';
import { ICSS, IUnit } from '../utils/types';

export type IInstance = {
  color?: string;
  blur?: IUnit;
  grow?: IUnit;
  down?: IUnit;
  across?: IUnit;
};

export type IShadows = string | IInstance | IInstance[];

export const shadowsDigester = createDigester({
  css: value => {
    const css = {} as ICSS;
    if (typeof value === 'string') {
      css.boxShadow = value;
    }
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        const createShadow = (data: IShadows) => {
          return [...Object.keys(data).map(i => formatUnits(i))]
            .join(' ')
            .trim();
        };
        css.boxShadow = Array.isArray(value)
          ? value.map(createShadow).join(', ')
          : createShadow(value);
      }
    }
    return css;
  },
});
