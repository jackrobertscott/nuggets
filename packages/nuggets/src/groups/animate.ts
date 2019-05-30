import { ICSS, IDigester, IUnit } from '../utils/types';
import { keyframes } from '../utils/emotion';
import { formatUnits } from '../utils/helpers';

export type IAnimate = {
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
};

export type IAnimateProps = IAnimate;

export const animateDigester: IDigester<IAnimateProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'object') {
    if (value.steps) {
      css.animationName = keyframes`${value.steps}`;
    }
    if (value.duration !== undefined) {
      css.animationDuration = formatUnits(value.duration, 'ms');
    }
    if (value.delay !== undefined) {
      css.animationDelay = formatUnits(value.delay, 'ms');
    }
    if (value.timing !== undefined) {
      css.animationTimingFunction = value.timing;
    }
    if (value.iterations !== undefined) {
      css.animationIterationCount = formatUnits(value.iterations, '');
    }
    if (value.direction !== undefined) {
      css.animationDirection = value.direction;
    }
    if (value.state !== undefined) {
      css.animationPlayState = value.state;
    }
    if (value.mode !== undefined) {
      css.animationFillMode = value.mode;
    }
  }
  return css;
};
