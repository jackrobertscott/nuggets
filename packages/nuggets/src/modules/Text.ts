import { FunctionComponent } from 'react';
import { createStyledPiece } from '../utils/styles';
import { CSSObject } from 'styled-components';

export const Text: FunctionComponent<ITextProps> = ({
  children,
  overrides,
  ...options
}) => {
  return createStyledPiece({
    children,
    overrides,
    digests: digests.map(rule => rule(options)),
  });
};

export interface ITextProps {
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  boldness?: number;
  height?: number;
  size?: number;
  children?: string | number;
  overrides?: CSSObject;
}

const digests: Array<(options: ITextProps) => string | false> = [
  ({ size }) => {
    return size !== undefined && `font-size: ${size}`;
  },
  ({ color }: ITextProps) => {
    return color !== undefined && `color: ${color}`;
  },
  ({ align }: ITextProps) => {
    return align !== undefined && `text-align: ${align}`;
  },
  /**
   * CSS Fonts work between 100 and 900.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Values
   */
  ({ boldness = 400 }: ITextProps) => {
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
  ({ height }: ITextProps) => {
    return height !== undefined && `line-height: ${height}`;
  },
];
