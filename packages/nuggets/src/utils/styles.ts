import { IBordersProps, bordersDigester } from '../styles/borders';
import { IShadowsProps, shadowsDigester } from '../styles/shadows';
import { IAnimateProps, animateDigester } from '../styles/animate';
import { ICharactersProps, charactersDigester } from '../styles/characters';
import { ICornersProps, cornersDigester } from '../styles/corners';
import { IPlaceholderProps, placeholderDigester } from '../styles/placeholder';
import { IPositionProps, positionDigester } from '../styles/position';
import { ICoreProps, coreDigester } from '../styles/core';
import { IFrameProps, frameDigester } from '../styles/frame';
import { IContentsProps, contentsDigester } from '../styles/contents';
import { ITransformProps, transformDigester } from '../styles/transform';
import { IDigester } from './types';
import { IAbsorbProps, absorbDigester } from '../styles/absorb';
import { IPaddingProps, paddingDigester } from '../styles/padding';

export type IStyles = ICoreProps & {
  absorb?: IAbsorbProps;
  animate?: IAnimateProps;
  borders?: IBordersProps;
  characters?: ICharactersProps;
  contents?: IContentsProps;
  corners?: ICornersProps;
  frame?: IFrameProps;
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
      borders,
      characters,
      contents,
      corners,
      frame,
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
      ...bordersDigester(borders),
      ...charactersDigester(characters),
      ...contentsDigester(contents),
      ...cornersDigester(corners),
      ...frameDigester(frame),
      ...paddingDigester(padding),
      ...placeholderDigester(placeholder),
      ...positionDigester(position),
      ...shadowsDigester(shadows),
      ...transformDigester(transform),
    };
  }
  return {};
};
