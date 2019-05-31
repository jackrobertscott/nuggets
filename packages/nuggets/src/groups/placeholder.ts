import { ICSS, IDigester } from '../utils/types';

export type IPlaceholder = {
  value?: number | string;
  color?: string;
};

export type IPlaceholderProps = number | string | IPlaceholder;

export const placeholderDigester: IDigester<IPlaceholderProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'object') {
    if (typeof value.color === 'string') {
      css['&::placeholder'] = value.color;
    }
  }
  return css;
};
