import { useState, useEffect } from 'react';
import { IStates, IEvents } from '../utils/types';
import { createListener } from '../utils/listeners';

export interface IuseElementOptions {
  element?: HTMLElement;
  events?: IEvents;
}

export type IuseElementProps = IStates;

export const useElement = ({
  element,
  events,
}: IuseElementOptions = {}): IuseElementProps => {
  const [hover, changeHover] = useState<boolean>(false);
  useEffect(
    () => {
      if (element) {
        const eventsListeners =
          typeof events === 'object'
            ? Object.keys(events).map(key => {
                return createListener(key, element, (event: any) => {
                  const value = event && event.target && event.target.value;
                  const action = events && events[key];
                  if (typeof action === 'function') {
                    action(value, event);
                  }
                });
              })
            : [];
        const unlisteners: Array<() => any> = [
          createListener('mouseenter', element, () => changeHover(true)),
          createListener('mouseleave', element, () => changeHover(false)),
          ...eventsListeners,
        ];
        return () => unlisteners.forEach(unlisten => unlisten());
      }
    },
    [element]
  );
  return {
    hover,
  };
};
