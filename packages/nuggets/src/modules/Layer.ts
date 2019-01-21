import { FunctionComponent, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  digestBackgroundColor,
  IBackgroundColorDigester,
} from '../utils/digests';
import { INuggie, createNuggie } from '../utils/nuggie';
import { IClickHappener, happenClick } from '../utils/happen';

export type ILayerStylesProps = IBackgroundColorDigester;

export type ILayerEventsProps = IClickHappener;

export type ILayerProps = {
  node?: HTMLElement | null;
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INuggie<ILayerStylesProps, ILayerEventsProps>;

export const Layer: FunctionComponent<ILayerProps> = ({
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
  const InterLayer = createNuggie<ILayerStylesProps, ILayerEventsProps>({
    children,
    options,
    events: [happenClick()],
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
  return createPortal(InterLayer, node);
};

Layer.displayName = 'Layer';
