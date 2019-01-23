import { FunctionComponent, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { INuggieProps, createNuggie } from '../../utils/dom';
import { ensure } from '../../utils/helpers';

export type ILayerProps = INuggieProps & {
  attach?: HTMLElement | null;
  children?: ReactElement<any> | Array<ReactElement<any>>;
};

export const Layer: FunctionComponent<ILayerProps> = ({
  children,
  css,
  ...options
}) => {
  const node: HTMLElement = options.attach || document.createElement('div');
  useEffect(() => {
    if (options.attach) {
      return;
    }
    document.body.appendChild(node);
    return () => {
      document.body.removeChild(node);
      node.remove();
    };
  }, []);
  const InterLayer = createNuggie({
    children,
    css: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      ...ensure(css),
    },
    ...options,
  });
  return createPortal(InterLayer, node);
};

Layer.displayName = 'Layer';
