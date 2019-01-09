import { FunctionComponent, ReactNode } from 'react';
import { createStyledComponent } from '../utils/styles';
import { CSSObject, css } from 'styled-components';

export interface IListCSSProps {
  overrides?: CSSObject;
}

const ListStyle = ({ overrides }: IListCSSProps) => `
  ${overrides && css(overrides)}
`;

export interface IListProps {
  items: any[];
  overrides?: CSSObject;
  children: (item: any) => ReactNode;
}

export const List: FunctionComponent<IListProps> = ({
  items,
  children,
  overrides,
}) => {
  return createStyledComponent(ListStyle, {
    overrides,
    children: items.map(children),
  });
};
