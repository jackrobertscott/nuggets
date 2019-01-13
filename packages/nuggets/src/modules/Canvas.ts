import { FunctionComponent, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  digestBackgroundColor,
  IBackgroundColorDigester,
} from '../utils/digests';
import { INuggie, createNuggie } from '../utils/nuggie';

export type ICanvasStylesProps = IBackgroundColorDigester;

export interface ICanvasEventsProps {}

export type ICanvasProps = {
  node?: HTMLElement | null;
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INuggie<ICanvasStylesProps, ICanvasEventsProps>;

export const Canvas: FunctionComponent<ICanvasProps> = ({
  children,
  ...options
}) => {
  const node: HTMLElement = options.node || document.createElement('div');
  useEffect(() => {
    if (options.node) {
      return;
    }
    document.body.appendChild(node);
    return () => {
      document.body.removeChild(node);
      node.remove();
    };
  }, []);
  const InterCanvas = createNuggie({
    children,
    options,
    events: [],
    styles: [
      () => ({
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }),
      digestBackgroundColor,
    ],
  });
  return createPortal(InterCanvas, node);
};

Canvas.displayName = 'Canvas';
