import { FunctionComponent, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { INuggieProps, createNuggie } from '../../utils/dom';

export type ILayerProps = INuggieProps<{}> & {
  children?: ReactElement<any> | Array<ReactElement<any>>;
  node?: HTMLElement | null;
  id?: string;
};

export const Layer: FunctionComponent<ILayerProps> = ({
  children,
  node,
  id,
  ...options
}) => {
  const item = node || document.getElementById(id || 'root');
  const precss = {
    display: 'flex',
    overflow: 'hidden',
    position: 'fixed',
    pointerEvents: 'none',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
  const InterLayer = createNuggie({
    children,
    precss,
    ...options,
  });
  return item && createPortal(InterLayer, item);
};

Layer.displayName = 'Layer';
