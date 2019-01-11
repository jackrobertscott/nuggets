import { createElement } from 'react';
import styled from 'styled-components';
import { ITransitionProps } from './styles';
import { IEventProps } from './events';

export interface INuggetProps {
  into?: { [name: string]: any };
}

export type INugget<T, E> = INuggetProps &
  T &
  ITransitionProps<T> &
  E &
  IEventProps<E>;

export interface IDomPiece {
  css: string;
  type?: string;
  children?: any;
  attrs?: { [name: string]: any };
  options: { [name: string]: any };
}

export const createDomPiece = ({
  css,
  type = 'div',
  children,
  options,
  attrs = {},
}: IDomPiece) => {
  const { into } = options;
  const styledPiece = styled(type as any)`
    ${css}
  `;
  console.log(Object.keys(attrs));
  return createElement(styledPiece, { children, ...attrs, ...into });
};
