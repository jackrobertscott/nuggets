import { createElement, FunctionComponent } from 'react';
import styled from 'styled-components';

export interface ILayoutProps {
  direction: string;
}

const Comp = styled.div<ILayoutProps>(
  ({ direction }) => `
  display: flex;
  flex-direction: ${direction};
  background-color: green;
`
);

const Layout: FunctionComponent = ({ ...props }) =>
  createElement(Comp, {
    direction: 'row',
    ...props,
  });

export default Layout;
