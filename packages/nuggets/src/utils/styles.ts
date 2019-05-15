import * as deep from 'deepmerge';
import { ICSS, IDigester } from './types';
import { ensure } from './helpers';
import { IFontsDigester, fontsDigester } from '../styles/fonts';
import { IShapeDigester, shapeDigester } from '../styles/shape';
import { IStructureDigester, structureDigester } from '../styles/structure';
import { ITransformDigester, transformDigester } from '../styles/transform';

export type IStylesOptions<S> = S & {
  hover?: S;
  press?: S;
  known?: S;
  merge?: IStylesOptions<S>;
};

export type IcreateCSSFromProps = <S>(
  data: IStylesOptions<S>,
  digester: IDigester<S>
) => ICSS;

export const createCSSFromProps: IcreateCSSFromProps = (data, digester) => {
  const { hover, press, known, ...options } = ensure(data);
  const css = digester(options);
  const merge = { arrayMerge: (_: any[], source: any[]) => source };
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

export type IStylesDigester = IFontsDigester &
  IShapeDigester &
  IStructureDigester &
  ITransformDigester;

export type IcreateCSSFromStyles = (
  data: IStylesOptions<IStylesDigester>
) => ICSS;

export const createCSSFromStyles: IcreateCSSFromStyles = ({
  merge,
  ...data
}) => {
  const digester: IDigester<IStylesDigester> = options => {
    return deep.all([
      fontsDigester(options),
      shapeDigester(options),
      structureDigester(options),
      transformDigester(options),
    ]) as ICSS;
  };
  return createCSSFromProps(deep.all([data, merge || {}]), digester);
};
