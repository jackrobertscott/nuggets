import { FunctionComponent, ReactElement } from 'react';
import { INuggieProps, createNuggie } from '../../utils/dom';

export type IFrameProps = INuggieProps & {
  children?: ReactElement<any> | Array<ReactElement<any>>;
};

export const Frame: FunctionComponent<IFrameProps> = ({
  children,
  ...options
}) => {
  return createNuggie({
    children,
    ...options,
  });
};

Frame.displayName = 'Frame';
