import { ICSS, IDigester, IOptions } from '../utils/types';

export type IPlaceholder = IOptions<{
  color?: string;
}>;

export type IPlaceholderProps = boolean | string | IOptions<IPlaceholder>;

export const placeholderDigester: IDigester<IPlaceholderProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'string') {
    css['&::placeholder'] = {
      color: value,
    };
  }
  if (typeof value === 'object') {
    if (typeof value.color === 'string') {
      css['&::placeholder'] = {
        color: value.color,
      };
    }
  }
  return css;
};
