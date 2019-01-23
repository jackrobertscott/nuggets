import { IArrangeDigester, digestArrange } from '../styles/arrange';
import { IBordersDigester, digestBorders } from '../styles/borders';
import { ICornersDigester, digestCorners } from '../styles/corners';
import { IExtraDigester, digestExtra } from '../styles/extra';
import { IShadeDigester, digestShade } from '../styles/shade';
import { IShapeDigester, digestShape } from '../styles/shape';
import { ITextsDigester, digestTexts } from '../styles/texts';
import { ITransformDigester, digestTransform } from '../styles/transform';
import { ICSSObject } from './styles';

export interface IStylesOptions {
  arrange?: IArrangeDigester;
  borders?: IBordersDigester;
  corners?: ICornersDigester;
  extra?: IExtraDigester;
  shade?: IShadeDigester;
  shape?: IShapeDigester;
  texts?: ITextsDigester;
  transform?: ITransformDigester;
}

export type IcreateCSSFromStyles = (options: IStylesOptions) => ICSSObject;

export const createCSSFromStyles: IcreateCSSFromStyles = ({
  arrange,
  borders,
  corners,
  extra,
  shade,
  shape,
  texts,
  transform,
}) => {
  return {
    ...(arrange ? digestArrange(arrange) : {}),
    ...(borders ? digestBorders(borders) : {}),
    ...(corners ? digestCorners(corners) : {}),
    ...(extra ? digestExtra(extra) : {}),
    ...(shade ? digestShade(shade) : {}),
    ...(shape ? digestShape(shape) : {}),
    ...(texts ? digestTexts(texts) : {}),
    ...(transform ? digestTransform(transform) : {}),
  };
};
