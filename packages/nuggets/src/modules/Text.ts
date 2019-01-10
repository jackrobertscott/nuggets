import { FunctionComponent, ReactText } from 'react';
import {
  createStyledPiece,
  createCSSFromDigests,
  IDigestArray,
  IStyledNugget,
} from '../utils/styles';
import { CSSObject, css } from 'styled-components';

export interface ITextStyles {
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  boldness?: number;
  height?: number;
  size?: number;
  family?: string;
  overrides?: CSSObject;
}

const digests: IDigestArray<ITextStyles> = [
  ({ size }) => {
    return size !== undefined && `font-size: ${size}`;
  },
  ({ color }) => {
    return color !== undefined && `color: ${color}`;
  },
  ({ align }) => {
    return align !== undefined && `text-align: ${align}`;
  },
  ({ family }) => {
    return family !== undefined && `font-family: ${family}`;
  },
  /**
   * CSS Fonts work between 100 and 900.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Values
   */
  ({ boldness = 400 }) => {
    const min = 100;
    const max = 900;
    if (boldness < min || boldness > max) {
      const message = `In "<Text boldness={number} />": number must be between ${min} and ${max} inclusive but got "${boldness}".`;
      throw new Error(message);
    }
    return `font-weight: ${boldness}`;
  },
  /**
   * Numbers will be multiplied against the font size.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
   */
  ({ height }) => {
    return height !== undefined && `line-height: ${height}`;
  },
  ({ overrides }) => {
    return overrides !== undefined && `${css(overrides)}`;
  },
];

export type ITextProps = {
  children?: ReactText | ReactText[];
} & IStyledNugget<ITextStyles>;

export const Text: FunctionComponent<ITextProps> = ({
  children,
  ...options
}) => {
  return createStyledPiece({
    children,
    css: createCSSFromDigests<ITextStyles>(options, digests),
  });
};
