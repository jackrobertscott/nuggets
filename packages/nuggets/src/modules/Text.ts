import { FunctionComponent } from 'react';
import { createStyledPiece } from '../utils/styles';
import { CSSObject } from 'styled-components';

export interface ITextProps {
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  children?: string | number;
  overrides?: CSSObject;
}

export const Text: FunctionComponent<ITextProps> = ({
  children,
  overrides,
  ...options
}) => {
  return createStyledPiece({
    children,
    overrides,
    digests: [digests.color(options), digests.align(options)],
  });
};

const digests = {
  color({ color }: ITextProps) {
    return color && `color: ${color}`;
  },
  align({ align }: ITextProps) {
    return align && `text-align: ${align}`;
  },
};
