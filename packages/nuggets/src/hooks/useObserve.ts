import { useState, useEffect, RefObject } from 'react';
import { IObserve } from '../utils/types';
import { createListener } from '../utils/listeners';

export interface IuseObserveOptions {
  current?: HTMLElement;
}

export type IuseObserveProps = IObserve;

export const useObserve = ({
  current,
}: IuseObserveOptions): IuseObserveProps => {
  const [hover, changeHover] = useState<boolean>(false);
  useEffect(
    () => {
      if (current) {
        const element = current;
        const eventsListeners: Array<() => any> = [
          createListener('mouseenter', element, () => changeHover(true)),
          createListener('mouseleave', element, () => changeHover(false)),
        ];
        return () => eventsListeners.forEach(unlisten => unlisten());
      }
    },
    [current]
  );
  return {
    hover,
  };
};
