import { FunctionComponent, ReactElement } from 'react';
import { INuggieProps, createNuggie } from '../../utils/dom';

export type ISquareProps = INuggieProps & {
  children?: ReactElement<any> | Array<ReactElement<any>>;
};

export const Square: FunctionComponent<ISquareProps> = ({
  children,
  ...options
}) => {
  return createNuggie({
    children,
    ...options,
  });
};

Square.displayName = 'Square';
