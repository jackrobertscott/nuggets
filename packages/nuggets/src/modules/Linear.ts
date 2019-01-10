import { FunctionComponent } from 'react';
import { createStyledPiece } from '../utils/styles';
import { CSSObject } from 'styled-components';

export interface ILinearProps {
  direction?: 'right' | 'left' | 'up' | 'down';
  overrides?: CSSObject;
}

export const Linear: FunctionComponent<ILinearProps> = ({
  children,
  overrides,
  ...options
}) => {
  return createStyledPiece({
    children,
    overrides,
    digests: [`display: flex;`, digests.direction(options)],
  });
};

const digests = {
  direction({ direction }: ILinearProps) {
    let value = 'down';
    switch (direction) {
      default:
      case 'right':
        value = 'row';
        break;
      case 'left':
        value = 'row-reverse';
        break;
      case 'down':
        value = 'column';
        break;
      case 'up':
        value = 'column-reverse';
        break;
    }
    return `flex-direction: ${value};`;
  },
};
