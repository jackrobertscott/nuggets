import { ICSS, IDigester, IUnit } from '../utils/types';
import { formatUnits } from '../utils/helpers';
import { keyframes } from '../utils/emotion';

export interface ITransform3dOptions {
  x?: IUnit;
  y?: IUnit;
  z?: IUnit;
}

export interface IAnimationOptions {
  steps: string;
  duration?: IUnit;
  delay?: IUnit;
  timing?:
    | 'ease'
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out'
    | 'linear'
    | 'step-start'
    | 'step-end'
    | string;
  iterations?: IUnit;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  state?: 'paused' | 'running';
  mode?: 'none' | 'forwards' | 'backwards' | 'both';
}

export interface ITransformDigester {
  rotate?: IUnit | ITransform3dOptions;
  scale?: number | ITransform3dOptions;
  translate?: IUnit | ITransform3dOptions;
  animation?: IAnimationOptions;
}

export const transformDigester: IDigester<ITransformDigester> = ({
  rotate,
  scale,
  translate,
  animation,
}) => {
  const css: ICSS = {};
  const transforms: string[] = [];
  if (rotate !== undefined) {
    transforms.push(createRotateTransform(rotate));
  }
  if (scale !== undefined) {
    transforms.push(createScaleTransform(scale));
  }
  if (translate !== undefined) {
    transforms.push(createTranslateTransform(translate));
  }
  if (transforms.length) {
    css.transform = transforms
      .filter(exists => exists)
      .join(' ')
      .trim();
  }
  if (animation !== undefined) {
    const {
      steps,
      duration,
      delay,
      timing,
      iterations,
      direction,
      state,
      mode,
    } = animation;
    if (steps) {
      css.animationName = keyframes`${steps}`;
    }
    if (duration !== undefined) {
      css.animationDuration = formatUnits(duration, 'ms');
    }
    if (delay !== undefined) {
      css.animationDelay = formatUnits(delay, 'ms');
    }
    if (timing !== undefined) {
      css.animationTimingFunction = timing;
    }
    if (iterations !== undefined) {
      css.animationIterationCount = formatUnits(iterations, '');
    }
    if (direction !== undefined) {
      css.animationDirection = direction;
    }
    if (state !== undefined) {
      css.animationPlayState = state;
    }
    if (mode !== undefined) {
      css.animationFillMode = mode;
    }
  }
  return css;
};

const createTransform = (name: string, value: any): string => {
  if (typeof value === 'number' || typeof value === 'string') {
    return `${name}(${value})`;
  }
  return '';
};

const createRotateTransform = (
  rotate?: IUnit | ITransform3dOptions
): string => {
  let transforms = '';
  if (rotate !== undefined) {
    if (typeof rotate === 'number' || typeof rotate === 'string') {
      transforms = createTransform('rotate', formatUnits(rotate, 'deg'));
    } else {
      const { x, y, z } = rotate as ITransform3dOptions;
      transforms = [
        transforms,
        createTransform('rotateX', formatUnits(x, 'deg')),
        createTransform('rotateY', formatUnits(y, 'deg')),
        createTransform('rotateZ', formatUnits(z, 'deg')),
      ]
        .filter(exists => exists)
        .join(' ')
        .trim();
    }
  }
  return transforms;
};

const createScaleTransform = (scale?: number | ITransform3dOptions): string => {
  let transforms = '';
  if (scale !== undefined) {
    if (typeof scale === 'number') {
      transforms = createTransform('scale', scale);
    } else {
      const { x, y, z } = scale as ITransform3dOptions;
      transforms =
        z === undefined
          ? `scale(${x || 1}, ${y || 1})`
          : `scale3d(${x || 1}, ${y || 1}, ${z || 1})`;
    }
  }
  return transforms;
};

const createTranslateTransform = (
  translate?: IUnit | ITransform3dOptions
): string => {
  let transforms = '';
  if (translate !== undefined) {
    if (typeof translate === 'number' || typeof translate === 'string') {
      transforms = createTransform('translate', translate);
    } else {
      const { x, y, z } = translate as ITransform3dOptions;
      if (z === undefined) {
        transforms = `translate(${formatUnits(x)}, ${formatUnits(y)})`;
      } else {
        transforms = `translate3d(${formatUnits(x)}, ${formatUnits(
          y
        )}, ${formatUnits(z)})`;
      }
    }
  }
  return transforms;
};
