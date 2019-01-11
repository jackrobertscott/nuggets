import {
  FunctionComponent,
  ReactElement,
  Component,
  createElement,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { createDomPiece, INugget } from '../utils/dom';
import { createCSSFromDigests } from '../utils/styles';
import { CSSObject, css } from 'styled-components';
import { createEvents, IEvents } from '../utils/events';

export interface ICanvasStyles {
  color?: string;
  overrides?: CSSObject;
}

const digests: Array<(options: ICanvasProps) => string | false> = [
  () => {
    return `
      display: flex;
      flex-direction: column;
      overflow: auto;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `;
  },
  ({ color }) => {
    return color !== undefined && `background-color: ${color};`;
  },
  ({ overrides }) => {
    return overrides !== undefined && `${css(overrides)}`;
  },
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
  const canvas = createDomPiece({
    children,
    options,
    attrs: createEvents(options),
    css: createCSSFromDigests<ICanvasStyles>(options, digests),
  });
  return createPortal(canvas, node);
};
