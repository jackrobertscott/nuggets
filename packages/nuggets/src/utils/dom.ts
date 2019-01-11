import { createElement } from 'react';
import styled from 'styled-components';
import { ITransitionProps } from './styles';
import { IEventProps } from './events';

export interface IDomPiece {
  children?: any;
  attrs?: { [name: string]: any };
  options: { [name: string]: any };
  css: string;
}

export interface INuggetProps {
  into?: { [name: string]: any };
}

export type INugget<T, E> = INuggetProps &
  T &
  ITransitionProps<T> &
  E &
  IEventProps<E>;

export const createDomPiece = ({
  children,
  options,
  attrs = {},
  css,
}: IDomPiece) => {
  const { ref, into } = options;
  const styledPiece = styled.div`
    ${css}
  `;
  return createElement(styledPiece, { children, ref, ...attrs, ...into });
};
