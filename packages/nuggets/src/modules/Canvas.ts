import { FunctionComponent, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { createDomPiece, INugget } from '../utils/dom';
import {
  createCSSFromDigests,
  ICSSObject,
  IDigestArray,
} from '../utils/styles';
import { createEvents, IEvents } from '../utils/events';

export interface ICanvasStyles {
  color?: string;
  overrides?: ICSSObject;
}

const digests: IDigestArray<ICanvasStyles> = [
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
  ({ color }) => color !== undefined && { backgroundColor: color },
  ({ overrides }) => overrides !== undefined && overrides,
];

export type ICanvasProps = {
  node?: HTMLElement | null;
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INugget<ICanvasStyles, IEvents>;

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
  const InterCanvas = createDomPiece({
    children,
    options,
    attrs: createEvents(options),
    css: createCSSFromDigests<ICanvasStyles>(options, digests),
  });
  return createPortal(InterCanvas, node);
};
