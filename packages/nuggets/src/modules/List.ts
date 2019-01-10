import {
  FunctionComponent,
  ReactNode,
  cloneElement,
  ReactElement,
} from 'react';

export const List: FunctionComponent<IListProps> = ({
  items,
  render,
  children,
}) => {
  if (render) {
    return items.map(props => cloneElement(render, props));
  }
  return items.map((...args) => children(...args)) as any;
};

export interface IListProps {
  items: any[];
  render?: ReactElement<any>;
  children: (item: any, index: number, array: any[]) => ReactNode;
}
