import { FunctionComponent, ReactNode, cloneElement, Fragment } from 'react';

export interface IListProps {
  items: any[];
  children: (item: any) => ReactNode;
}

export const List: FunctionComponent<IListProps> = ({ items, children }) => {
  return items.map(children) as any;
};
