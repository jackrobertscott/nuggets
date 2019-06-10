import { IEvents } from './types';
import { capitalize } from './helpers';

export const eventsDigester = (events: IEvents) => {
  return Object.keys(events).reduce((all, key) => {
    const action = events && events[key];
    if (typeof action === 'function') {
      return {
        ...all,
        [`on${capitalize(key)}`]: (event: any) => {
          const value = event && event.target && event.target.value;
          action(value, event);
        },
      };
    }
    return all;
  }, {});
};
