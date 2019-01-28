import { FunctionComponent, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { INuggieProps, createNuggie } from '../../utils/dom';
import { ensure } from '../../utils/helpers';

export type ILayerProps = INuggieProps<{}> & {
  node?: HTMLElement | null;
  children?: ReactElement<any> | Array<ReactElement<any>>;
};

export const Layer: FunctionComponent<ILayerProps> = ({
  children,
  node,
  css,
  ...options
}) => {
  const attach: HTMLElement = node || document.createElement('div');
  useEffect(() => {
    if (node) {
      return;
    }
    document.body.appendChild(attach);
    return () => {
      document.body.removeChild(attach);
      attach.remove();
    };
  }, []);
  const InterLayer = createNuggie({
    children,
    css: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      ...ensure(css),
    },
    ...options,
  });
  return createPortal(InterLayer, attach);
};

Layer.displayName = 'Layer';
