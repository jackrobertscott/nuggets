import { FunctionComponent, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { createDOMNode, INugget } from '../utils/dom';
import { createCSSFromDigests, IDigestArray } from '../utils/styles';
import { createEvents, IEvents } from '../utils/events';
import {
  digestBackgroundColor,
  digestOverrides,
  IBackgroundColorDigest,
  IOverridesDigest,
} from '../utils/digests';

/**
 * 1. Optionally add styles based on props.
 * 2. Optionally render a dom item.
 * 3. Optionally have a state and state manipulation functions.
 * 4. Needs onmount, componentdidupdate and willunmount access.
 */

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
  const InterCanvas = createDOMNode({
    children,
    options,
    attrs: createEvents(options),
    css: createCSSFromDigests<ICanvasStyles>(options, digests),
  });
  return createPortal(InterCanvas, node);
};

Canvas.displayName = 'Canvas';

export type ICanvasStyles = IBackgroundColorDigest & IOverridesDigest;

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
  digestBackgroundColor,
  digestOverrides,
];
