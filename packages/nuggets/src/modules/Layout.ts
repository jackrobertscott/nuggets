import { createElement, FunctionComponent } from 'react';
import styled from 'styled-components';

export interface ILayoutProps {
  direction?: string;
}

const Comp = styled.div<ILayoutProps>(
  ({ direction }) => `
  display: flex;
  flex-direction: ${direction};
`
);

// const Wrap = styled.div(({ direction }) => ({
//   display: 'flex',
//   flexDirection: direction,
// }));

export const Layout: FunctionComponent = ({ ...props }) =>
  createElement(Comp, {
    direction: 'row',
    ...props,
  });
