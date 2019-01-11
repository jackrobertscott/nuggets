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
    return `
      flex-grow: 1;
      display: flex;
      overflow: auto;
    `;
  },
  ({ direction }) => {
    let value;
    switch (direction) {
      default:
      case 'down':
        value = 'column';
        break;
      case 'up':
        value = 'column-reverse';
        break;
      case 'right':
        value = 'row';
        break;
      case 'left':
        value = 'row-reverse';
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
    options,
    css: createCSSFromDigests<ILinearStyles>(options, digests),
  });
};
