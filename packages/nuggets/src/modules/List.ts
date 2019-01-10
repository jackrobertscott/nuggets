import {
  FunctionComponent,
  ReactNode,
  cloneElement,
  ReactElement,
} from 'react';

export interface IListProps {
  items: any[];
  render?: ReactElement<any>;
  children: (item: any) => ReactNode;
}

export const List: FunctionComponent<IListProps> = ({
  items,
  render,
  children,
}) => {
  if (render) {
    return items.map(props => cloneElement(render, props));
  }
  return items.map(children) as any;
};
