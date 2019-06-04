import { IBackgroundProps, backgroundDigester } from '../styles/background';
import { IBordersProps, bordersDigester } from '../styles/borders';
import { IShadowsProps, shadowsDigester } from '../styles/shadows';
import { IAnimateProps, animateDigester } from '../styles/animate';
import { ICharactersProps, charactersDigester } from '../styles/characters';
import { ICornersProps, cornersDigester } from '../styles/corners';
import { IPlaceholderProps, placeholderDigester } from '../styles/placeholder';
import { IPositionProps, positionDigester } from '../styles/position';
import { ISettingsProps, settingsDigester } from '../styles/settings';
import { IShapeProps, shapeDigester } from '../styles/shape';
import { IContentsProps, contentsDigester } from '../styles/contents';
import { ITransformProps, transformDigester } from '../styles/transform';
import { IDigester } from './types';

export type IStyles = {
  animate?: IAnimateProps;
  background?: IBackgroundProps;
  borders?: IBordersProps;
  characters?: ICharactersProps;
  corners?: ICornersProps;
  placeholder?: IPlaceholderProps;
  position?: IPositionProps;
  settings?: ISettingsProps;
  shadows?: IShadowsProps;
  shape?: IShapeProps;
  contents?: IContentsProps;
  transform?: ITransformProps;
};

export const stylesDigester: IDigester<IStyles> = value => {
  if (typeof value === 'object') {
    return {
      ...animateDigester(value.animate),
      ...backgroundDigester(value.background),
      ...bordersDigester(value.borders),
      ...charactersDigester(value.characters),
      ...cornersDigester(value.corners),
      ...placeholderDigester(value.placeholder),
      ...positionDigester(value.position),
      ...settingsDigester(value.settings),
      ...shadowsDigester(value.shadows),
      ...shapeDigester(value.shape),
      ...contentsDigester(value.contents),
      ...transformDigester(value.transform),
    };
  }
  return {};
};
