import { FunctionComponent, ReactText } from 'react';
import { createDomPiece, INugget } from '../utils/dom';
import {
  createCSSFromDigests,
  IDigestArray,
  ICSSObject,
} from '../utils/styles';
import { createEvents, IEvents } from '../utils/events';

export interface ITextStyles {
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  boldness?: number;
  height?: number;
  size?: number;
  family?: string;
  overrides?: ICSSObject;
}

const digests: IDigestArray<ITextStyles> = [
  ({ size }) => size !== undefined && { fontSize: `${size}px` },
  ({ color }) => color !== undefined && { color },
  ({ align }) => align !== undefined && { textAlign: align },
  ({ family }) => family !== undefined && { fontFamily: family },
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
    return { fontWeight: boldness };
  },
  /**
   * Numbers will be multiplied against the font size.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
   */
  ({ height }) => height !== undefined && { lineHeight: height },
  ({ overrides }) => overrides !== undefined && overrides,
];

export type ITextProps = {
  children?: ReactText | ReactText[];
} & INugget<ITextStyles, IEvents>;

export const Text: FunctionComponent<ITextProps> = ({
  children,
  ...options
}) => {
  return createDomPiece({
    children,
    options,
    attrs: createEvents(options),
    css: createCSSFromDigests<ITextStyles>(options, digests),
  });
};
