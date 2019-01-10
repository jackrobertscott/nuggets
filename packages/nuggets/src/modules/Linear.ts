import { FunctionComponent } from 'react';
import { createStyledPiece } from '../utils/styles';
import { CSSObject } from 'styled-components';

export const Linear: FunctionComponent<ILinearProps> = ({
  children,
  overrides,
  style,
  ...options
}) => {
  const data = { ...style, ...options };
  return createStyledPiece({
    children,
    overrides,
    digests: digests.map(rule => rule(data)),
  });
};

export interface ILinearProps {
  direction?: 'right' | 'left' | 'up' | 'down';
  overrides?: CSSObject;
  style?: ILinearProps;
}

const digests: Array<(options: ILinearProps) => string | false> = [
  () => {
    return `display: flex;`;
  },
  ({ direction }) => {
    let value;
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
];
