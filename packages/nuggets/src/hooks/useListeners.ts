import { useEffect, MutableRefObject } from 'react';
import { IEvents } from '../utils/types';
import { createListener } from '../utils/listeners';

export interface IuseListenersOptions {
  reference: MutableRefObject<any>;
  events?: IEvents;
}

export type IuseListenersProps = void;

export const useListeners = ({
  reference,
  events,
}: IuseListenersOptions): IuseListenersProps => {
  useEffect(
    () => {
      if (reference.current) {
        const element = reference.current;
        if (typeof events === 'object') {
          const eventsListeners = Object.keys(events).map(key => {
            return createListener(key, element, (event: any) => {
              const value = event && event.target && event.target.value;
              const action = events && events[key];
              if (typeof action === 'function') {
                action(value, event);
              }
            });
          });
          return () => eventsListeners.forEach(unlisten => unlisten());
        }
      }
    },
    [reference.current]
  );
};
