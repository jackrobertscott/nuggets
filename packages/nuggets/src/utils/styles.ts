import * as deep from 'deepmerge';
import { ICSS, IDigester } from './types';
import { ensure } from './helpers';

export type IStylesOptions<S> = S & {
  hover?: S;
  press?: S;
  known?: S;
};

export type IrenderCSSFromProp = <S>(
  data: IStylesOptions<S>,
  digester: IDigester<S>
) => ICSS;

export const createCSSFromProps: IrenderCSSFromProp = (data, digester) => {
  const { hover, press, known, ...options } = ensure(data);
  const css = digester(options);
  const merge = {
    arrayMerge: (_: any[], source: any[]) => source,
  };
  if (hover) {
    css['&:hover'] = digester(deep(options, hover, merge));
  }
  if (press) {
    css['&:active'] = digester(deep(options, press, merge));
  }
  if (known) {
    css['&:visited'] = digester(deep(options, known, merge));
  }
  return css;
};
