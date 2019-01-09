import { FunctionComponent } from 'react';
import { createStyledComponent } from '../utils/styles';
import { CSSObject, css } from 'styled-components';

export interface ILinearCSSProps {
  direction: string;
  overrides?: CSSObject;
}

const style = ({ overrides, direction }: ILinearCSSProps) => `
  display: flex;
  flex-direction: ${direction};
  ${overrides && css(overrides)}
`;

export interface ILinearProps {
  direction?: 'right' | 'left' | 'up' | 'down';
  overrides?: CSSObject;
}

export const Linear: FunctionComponent<ILinearProps> = ({
  children,
  overrides,
  ...options
}) => {
  return createStyledComponent(style, {
    children,
    overrides,
    direction: digests.direction(options),
  });
};

const digests = {
  direction({ direction }: ILinearProps) {
    switch (direction) {
      default:
      case 'right':
        return 'row';
      case 'left':
        return 'row-reverse';
      case 'down':
        return 'column';
      case 'up':
        return 'column-reverse';
    }
  },
};
