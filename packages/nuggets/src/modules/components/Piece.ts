import { FunctionComponent, ReactElement } from 'react';
import { INuggieProps, createNuggie } from '../../utils/dom';

export type IPieceProps = INuggieProps & {
  children?: ReactElement<any> | Array<ReactElement<any>>;
};

export const Piece: FunctionComponent<IPieceProps> = ({
  children,
  ...options
}) => {
  return createNuggie({
    children,
    ...options,
  });
};

Piece.displayName = 'Piece';
