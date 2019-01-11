import { jsx, css as emotion } from '@emotion/core';
import { createElement } from 'react';
import { ITransitionProps, ICSSObject } from './styles';
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
  css: ICSSObject;
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
  return jsx(type, {
    children,
    css: emotion(css),
    ...attrs,
    ...into,
  });
};
