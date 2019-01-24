import * as deep from 'deepmerge';

import { IFrameDigester, digestFrame } from '../styles/frame';
import { IExtraDigester, digestExtra } from '../styles/extra';
import { IShapeDigester, digestShape } from '../styles/shape';
import { ITextsDigester, digestTexts } from '../styles/texts';
import { ITransformDigester, digestTransform } from '../styles/transform';
import { ICSS, IDigester } from './types';
import { ensure } from './helpers';

export type IStatefulStyles<S> = S & {
  hover?: S;
  press?: S;
  known?: S;
};

export interface IStylesOptions {
  frame?: IStatefulStyles<IFrameDigester>;
  extra?: IStatefulStyles<IExtraDigester>;
  shape?: IStatefulStyles<IShapeDigester>;
  texts?: IStatefulStyles<ITextsDigester>;
  transform?: IStatefulStyles<ITransformDigester>;
}

export type IcreateCSSFromStyles = (options: IStylesOptions) => ICSS;

export const createCSSFromStyles: IcreateCSSFromStyles = styles => {
  const { frame, extra, shape, texts, transform } = styles;
  const options = [
    frame ? renderCSSFromProp<IFrameDigester>(frame, digestFrame) : {},
    extra ? renderCSSFromProp<IExtraDigester>(extra, digestExtra) : {},
    shape ? renderCSSFromProp<IShapeDigester>(shape, digestShape) : {},
    texts ? renderCSSFromProp<ITextsDigester>(texts, digestTexts) : {},
    transform
      ? renderCSSFromProp<ITransformDigester>(transform, digestTransform)
      : {},
  ];
  return deep.all(options) as ICSS;
};

export type IrenderCSSFromProp = <S>(
  data: IStatefulStyles<S>,
  digester: IDigester<S>
) => ICSS;

const renderCSSFromProp: IrenderCSSFromProp = (data, digester) => {
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
