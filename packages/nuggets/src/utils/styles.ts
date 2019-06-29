import { IDigester } from './types';
import { IBordersProps, bordersDigester } from '../styles/borders';
import { IShadowsProps, shadowsDigester } from '../styles/shadows';
import { IAnimateProps, animateDigester } from '../styles/animate';
import { ILettersProps, lettersDigester } from '../styles/letters';
import { ICornersProps, cornersDigester } from '../styles/corners';
import { IPlaceholderProps, placeholderDigester } from '../styles/placeholder';
import { IPositionProps, positionDigester } from '../styles/position';
import { ICoreProps, coreDigester } from '../styles/core';
import { IBackgroundProps, backgroundDigester } from '../styles/background';
import { ITransformProps, transformDigester } from '../styles/transform';
import { IAbsorbProps, absorbDigester } from '../styles/absorb';
import { IPaddingProps, paddingDigester } from '../styles/padding';

export type IStyles = ICoreProps & {
  absorb?: IAbsorbProps;
  animate?: IAnimateProps;
  background?: IBackgroundProps;
  borders?: IBordersProps;
  corners?: ICornersProps;
  letters?: ILettersProps;
  padding?: IPaddingProps;
  placeholder?: IPlaceholderProps;
  position?: IPositionProps;
  shadows?: IShadowsProps;
  transform?: ITransformProps;
};

export const stylesDigester: IDigester<IStyles> = value => {
  if (typeof value === 'object') {
    const {
      absorb,
      animate,
      background,
      borders,
      corners,
      letters,
      padding,
      placeholder,
      position,
      shadows,
      transform,
      ...core
    } = value;
    return {
      ...coreDigester(core),
      ...absorbDigester(absorb),
      ...animateDigester(animate),
      ...backgroundDigester(background),
      ...bordersDigester(borders),
      ...cornersDigester(corners),
      ...lettersDigester(letters),
      ...paddingDigester(padding),
      ...placeholderDigester(placeholder),
      ...positionDigester(position),
      ...shadowsDigester(shadows),
      ...transformDigester(transform),
    };
  }
  return {};
};
