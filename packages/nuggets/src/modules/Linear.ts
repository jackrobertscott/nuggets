import { FunctionComponent, ReactElement } from 'react';
import {
  createStyledPiece,
  createCSSFromDigests,
  IStyledNugget,
} from '../utils/styles';
import { CSSObject, css } from 'styled-components';

export interface ILinearStyles {
  direction?: 'right' | 'left' | 'up' | 'down';
  overrides?: CSSObject;
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
  ({ overrides }) => {
    return overrides !== undefined && `${css(overrides)}`;
  },
];

export type ILinearProps = {
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & IStyledNugget<ILinearStyles>;

export const Linear: FunctionComponent<ILinearProps> = ({
  children,
  ...options
}) => {
  return createStyledPiece({
    children,
    css: createCSSFromDigests<ILinearStyles>(options, digests),
  });
};
