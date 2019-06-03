import { useState, useEffect, RefObject } from 'react';
import { IObserve } from '../utils/types';
import { createListener } from '../utils/listeners';

export interface IuseObserveOptions {
  reference: RefObject<any>;
}

export type IuseObserveProps = IObserve;

export const useObserve = ({
  reference,
}: IuseObserveOptions): IuseObserveProps => {
  const [hover, changeHover] = useState<boolean>(false);
  useEffect(
    () => {
      if (reference.current) {
        const element = reference.current;
        const eventsListeners: Array<() => any> = [
          createListener('mouseenter', element, () => changeHover(true)),
          createListener('mouseleave', element, () => changeHover(false)),
        ];
        return () => eventsListeners.forEach(unlisten => unlisten());
      }
    },
    [reference.current]
  );
  return {
    hover,
  };
};
