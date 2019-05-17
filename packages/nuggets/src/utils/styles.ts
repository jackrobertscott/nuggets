import * as deep from 'deepmerge';
import { ICSS, IDigester } from './types';
import { ensure } from './helpers';
import { IFontsDigester, fontsDigester } from '../styles/fonts';
import { IShapeDigester, shapeDigester } from '../styles/shape';
import { IStructureDigester, structureDigester } from '../styles/structure';
import { ITransformDigester, transformDigester } from '../styles/transform';
import { IThemeOptions } from './theme';

export type IStylesOptions<S> = S & {
  hover?: S;
  press?: S;
  known?: S;
  merge?: IStylesOptions<S>;
};

export type IcreateCSSFromProps = <S>(
  data: IStylesOptions<S>,
  digester: IDigester<S>,
  theme: IThemeOptions
) => ICSS;

export const createCSSFromProps: IcreateCSSFromProps = (
  data,
  digester,
  theme
) => {
  const { hover, press, known, ...options } = ensure(data);
  const css = digester(theme)(options);
  const merge = { arrayMerge: (_: any[], source: any[]) => source };
  if (hover) {
    css['&:hover'] = digester(theme)(deep(options, hover, merge));
  }
  if (press) {
    css['&:active'] = digester(theme)(deep(options, press, merge));
  }
  if (known) {
    css['&:visited'] = digester(theme)(deep(options, known, merge));
  }
  return css;
};

export type IStylesDigester = IFontsDigester &
  IShapeDigester &
  IStructureDigester &
  ITransformDigester;

export type IcreateCSSFromStyles = (
  data: IStylesOptions<IStylesDigester>,
  theme?: IThemeOptions
) => ICSS;

export const createCSSFromStyles: IcreateCSSFromStyles = (data, theme = {}) => {
  const digester: IDigester<IStylesDigester> = use => options => {
    return deep.all([
      fontsDigester(use)(options),
      shapeDigester(use)(options),
      structureDigester(use)(options),
      transformDigester(use)(options),
    ]) as ICSS;
  };
  return createCSSFromProps(data, digester, theme);
};
