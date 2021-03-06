import { ICSS, IDigester, IUnit, IOptions } from '../utils/types';
import { keyframes } from '../utils/emotion';
import { formatUnits } from '../utils/helpers';

export type IAnimate = IOptions<{
  steps?: string;
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
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | string;
  state?: 'paused' | 'running' | string;
  mode?: 'none' | 'forwards' | 'backwards' | 'both' | string;
}>;

export type IAnimateProps = boolean | IOptions<IAnimate>;

export const animateDigester: IDigester<IAnimateProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'object') {
    if (typeof value.steps === 'string') {
      css.animationName = keyframes`${value.steps}`;
    }
    if (
      typeof value.duration === 'string' ||
      typeof value.duration === 'number'
    ) {
      css.animationDuration = formatUnits(value.duration, 'ms');
    }
    if (typeof value.delay === 'string' || typeof value.delay === 'number') {
      css.animationDelay = formatUnits(value.delay, 'ms');
    }
    if (typeof value.timing === 'string') {
      css.animationTimingFunction = value.timing;
    }
    if (
      typeof value.iterations === 'string' ||
      typeof value.iterations === 'number'
    ) {
      css.animationIterationCount = formatUnits(value.iterations, '');
    }
    if (typeof value.direction === 'string') {
      css.animationDirection = value.direction;
    }
    if (typeof value.state === 'string') {
      css.animationPlayState = value.state;
    }
    if (typeof value.mode === 'string') {
      css.animationFillMode = value.mode;
    }
  }
  return css;
};
