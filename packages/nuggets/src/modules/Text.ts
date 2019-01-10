import { FunctionComponent, ReactElement } from 'react';
import { createStyledComponent } from '../utils/styles';
import { CSSObject, css } from 'styled-components';

export interface ITextCSSProps {
  color?: string;
  align?: string;
  overrides?: CSSObject;
}

const style = ({ overrides, color, align }: ITextCSSProps) => `
  color: ${color};
  text-align: ${align};
  ${overrides && css(overrides)}
`;

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
  return createStyledComponent(style, {
    children,
    overrides,
    color: digests.color(options),
    align: digests.align(options),
  });
};

const digests = {
  color({ color }: ITextProps) {
    return color;
  },
  align({ align }: ITextProps) {
    return align;
  },
};
