import { useState, useEffect, RefObject } from 'react';
import { IObserve } from '../utils/types';
import { createListener } from '../utils/listeners';

export interface IuseObserveOptions {
  reference: RefObject<HTMLElement>;
}

export type IuseObserveProps = IObserve;

export const useObserve = ({
  reference,
}: IuseObserveOptions): IuseObserveProps => {
  const [hover, changeHover] = useState<boolean>(false);
  const [focus, changeFocus] = useState<boolean>(false);
  const [active, changeActive] = useState<boolean>(false);
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
        return () => eventsListeners.forEach(unlisten => unlisten());
      }
    },
    [reference.current]
  );
  return {
    hover,
    focus,
    active,
  };
};
