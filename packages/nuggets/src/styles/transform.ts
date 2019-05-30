import { ICSS, IDigester, IUnit } from '../utils/types';
import { formatUnits } from '../utils/helpers';
import { keyframes } from '../utils/emotion';

export interface ITransform3dOptions {}

export interface IAnimationOptions {}

export interface ITransformDigester {}

export const transformDigester: IDigester<ITransformDigester> = ({
  rotate,
  scale,
  translate,
  animation,
}) => {
  const css: ICSS = {};

  return css;
};
