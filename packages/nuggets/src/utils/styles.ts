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
  digester: IDigester<S>,
  classname?: string
) => ICSS;

export const createCSSFromProps: IrenderCSSFromProp = (
  data,
  digester,
  classname
) => {
  const { hover, press, known, ...options } = ensure(data);
  const css = classname
    ? { [classname]: digester(options) }
    : digester(options);
  const merge = {
    arrayMerge: (_: any[], source: any[]) => source,
  };
  if (hover) {
    css[`&:hover ${classname || ''}`.trim()] = digester(
      deep(options, hover, merge)
    );
  }
  if (press) {
    css[`&:active ${classname || ''}`.trim()] = digester(
      deep(options, press, merge)
    );
  }
  if (known) {
    css[`&:visited ${classname || ''}`.trim()] = digester(
      deep(options, known, merge)
    );
  }
  return css;
};
