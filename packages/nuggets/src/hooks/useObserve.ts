import { useState, useEffect, MutableRefObject } from 'react';
import { IObserve } from '../utils/types';
import { createListener } from '../utils/listeners';

export interface IuseObserveOptions {
  reference: MutableRefObject<any>;
}

export type IuseObserveProps = IObserve;

export const useObserve = ({
  reference,
}: IuseObserveOptions): IuseObserveProps => {
  const [hover, changeHover] = useState<boolean>(false);
  const [focus, changeFocus] = useState<boolean>(false);
  const [active, changeActive] = useState<boolean>(false);
  const [list, changeList] = useState<{
    index?: number;
    first?: boolean;
    last?: boolean;
  }>({});
  useEffect(
    () => {
      if (reference.current) {
        const element = reference.current;
        const eventsListeners: Array<() => any> = [
          createListener('mouseenter', element, () => changeHover(true)),
          createListener('mouseleave', element, () => changeHover(false)),
          createListener('focusin', element, () => changeFocus(true)),
          createListener('focusout', element, () => changeFocus(false)),
          createListener('mousedown', element, () => changeActive(true)),
          createListener('mouseup', document, () => changeActive(false)),
        ];
        const indexify = (parent: HTMLElement | null) => {
          if (parent) {
            const children = [...parent.children];
            const index = children.indexOf(element as any);
            changeList({
              first: index === 0,
              last: index === children.length - 1,
              index,
            });
          }
        };
        const observer = new MutationObserver(mutations => {
          mutations.forEach(({ type }) => {
            if (type === 'childList') {
              indexify(element.parentElement);
            }
          });
        });
        if (element.parentElement) {
          indexify(element.parentElement);
          observer.observe(element.parentElement, {
            childList: true,
          });
        }
        return () => {
          eventsListeners.forEach(unlisten => unlisten());
          observer.disconnect();
        };
      }
    },
    [reference.current]
  );
  return {
    hover,
    focus,
    active,
    ...list,
  };
};
