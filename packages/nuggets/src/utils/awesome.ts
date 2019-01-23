import * as deep from 'deepmerge';

import { IArrangeDigester, digestArrange } from '../styles/arrange';
import { IBordersDigester, digestBorders } from '../styles/borders';
import { ICornersDigester, digestCorners } from '../styles/corners';
import { IExtraDigester, digestExtra } from '../styles/extra';
import { IShadeDigester, digestShade } from '../styles/shade';
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
  arrange?: IStatefulStyles<IArrangeDigester>;
  borders?: IStatefulStyles<IBordersDigester>;
  corners?: IStatefulStyles<ICornersDigester>;
  extra?: IStatefulStyles<IExtraDigester>;
  shade?: IStatefulStyles<IShadeDigester>;
  shape?: IStatefulStyles<IShapeDigester>;
  texts?: IStatefulStyles<ITextsDigester>;
  transform?: IStatefulStyles<ITransformDigester>;
}

export type IcreateCSSFromStyles = (options: IStylesOptions) => ICSS;

export const createCSSFromStyles: IcreateCSSFromStyles = styles => {
  const {
    arrange,
    borders,
    corners,
    extra,
    shade,
    shape,
    texts,
    transform,
  } = styles;
  const options = [
    arrange ? renderCSSFromProp<IArrangeDigester>(arrange, digestArrange) : {},
    borders ? renderCSSFromProp<IBordersDigester>(borders, digestBorders) : {},
    corners ? renderCSSFromProp<ICornersDigester>(corners, digestCorners) : {},
    extra ? renderCSSFromProp<IExtraDigester>(extra, digestExtra) : {},
    shade ? renderCSSFromProp<IShadeDigester>(shade, digestShade) : {},
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
  if (hover) {
    css['&:hover'] = digester(hover);
  }
  if (press) {
    css['&:active'] = digester(press);
  }
  if (known) {
    css['&:visited'] = digester(known);
  }
  return css;
};
