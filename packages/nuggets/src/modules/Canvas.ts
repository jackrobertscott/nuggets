import { FunctionComponent, ReactElement } from 'react';
import {
  createStyledPiece,
  IStyledNugget,
  createCSSFromDigests,
} from '../utils/styles';
import { CSSObject, css } from 'styled-components';

export interface ICanvasStyles {
  color?: string;
  overrides?: CSSObject;
}

const digests: Array<(options: ICanvasProps) => string | false> = [
  () => {
    return `
      display: flex;
      flex-direction: column;
      overflow: auto;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `;
  },
  ({ color }) => {
    return color !== undefined && `background-color: ${color};`;
  },
  ({ overrides }) => {
    return overrides !== undefined && `${css(overrides)}`;
  },
];

export type ICanvasProps = {
  children?: ReactElement<any>;
} & IStyledNugget<ICanvasStyles>;

export const Canvas: FunctionComponent<ICanvasProps> = ({
  children,
  ...options
}) => {
  return createStyledPiece({
    children,
    options,
    css: createCSSFromDigests<ICanvasStyles>(options, digests),
  });
};
