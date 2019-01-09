import { FunctionComponent } from 'react';
import { createStyledComponent } from '../utils/styles';
import { CSSObject, css } from 'styled-components';

export interface ILayoutCSSProps {
  direction: string;
  overrides?: CSSObject;
}

const layoutStyle = ({ overrides, direction }: ILayoutCSSProps) => `
  display: flex;
  flex-direction: ${direction};
  ${overrides && css(overrides)}
`;

export interface ILayoutProps {
  direction?: 'right' | 'left' | 'up' | 'down';
  overrides?: CSSObject;
}

export const Layout: FunctionComponent<ILayoutProps> = ({
  children,
  overrides,
  ...options
}) => {
  return createStyledComponent(layoutStyle, {
    children,
    overrides,
    direction: digestDirection(options),
  });
};

const digestDirection = ({ direction }: ILayoutProps) => {
  switch (direction) {
    default:
    case 'right':
      return 'row';
    case 'left':
      return 'row-reverse';
    case 'down':
      return 'column';
    case 'up':
      return 'column-reverse';
  }
};
