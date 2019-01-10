import { FunctionComponent, ReactText } from 'react';
import { createStyledPiece } from '../utils/styles';
import { CSSObject } from 'styled-components';

export const Text: FunctionComponent<ITextProps> = ({
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

export interface ITextProps {
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  boldness?: number;
  height?: number;
  size?: number;
  family?: string;
  children?: ReactText | ReactText[];
  overrides?: CSSObject;
  style?: ITextProps;
}

const digests: Array<(options: ITextProps) => string | false> = [
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
];
