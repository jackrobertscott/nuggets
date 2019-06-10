import { IBordersProps, bordersDigester } from '../styles/borders';
import { IShadowsProps, shadowsDigester } from '../styles/shadows';
import { IAnimateProps, animateDigester } from '../styles/animate';
import { ICharactersProps, charactersDigester } from '../styles/characters';
import { ICornersProps, cornersDigester } from '../styles/corners';
import { IPlaceholderProps, placeholderDigester } from '../styles/placeholder';
import { IPositionProps, positionDigester } from '../styles/position';
import { ICoreProps, coreDigester } from '../styles/core';
import { IShapeProps, shapeDigester } from '../styles/shape';
import { IStructureProps, structureDigester } from '../styles/structure';
import { ITransformProps, transformDigester } from '../styles/transform';
import { IDigester } from './types';
import { IAbsorbProps, absorbDigester } from '../styles/absorb';
import { IPaddingProps, paddingDigester } from '../styles/padding';

export type IStyles = ICoreProps & {
  absorb?: IAbsorbProps;
  animate?: IAnimateProps;
  borders?: IBordersProps;
  characters?: ICharactersProps;
  corners?: ICornersProps;
  padding?: IPaddingProps;
  placeholder?: IPlaceholderProps;
  position?: IPositionProps;
  shadows?: IShadowsProps;
  shape?: IShapeProps;
  structure?: IStructureProps;
  transform?: ITransformProps;
};

export const stylesDigester: IDigester<IStyles> = value => {
  if (typeof value === 'object') {
    const {
      absorb,
      animate,
      borders,
      characters,
      structure,
      corners,
      padding,
      placeholder,
      position,
      shadows,
      shape,
      transform,
      ...core
    } = value;
    return {
      ...coreDigester(core),
      ...absorbDigester(absorb),
      ...animateDigester(animate),
      ...bordersDigester(borders),
      ...charactersDigester(characters),
      ...structureDigester(structure),
      ...cornersDigester(corners),
      ...paddingDigester(padding),
      ...placeholderDigester(placeholder),
      ...positionDigester(position),
      ...shadowsDigester(shadows),
      ...shapeDigester(shape),
      ...transformDigester(transform),
    };
  }
  return {};
};
