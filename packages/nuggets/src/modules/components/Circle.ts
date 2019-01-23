import { FunctionComponent, ReactElement } from 'react';
import { INuggieProps, createNuggie } from '../../utils/dom';

export type ICircleProps = INuggieProps & {
  children?: ReactElement<any> | Array<ReactElement<any>>;
};

export const Circle: FunctionComponent<ICircleProps> = ({
  children,
  ...options
}) => {
  return createNuggie({
    children,
    ...options,
  });
};

Circle.displayName = 'Circle';
