import { IEvents } from './types';
import { capitalize } from './helpers';

export const eventsDigester = (events: IEvents) => {
  return Object.keys(events).reduce((all, key) => {
    const event = events[key] as any;
    const data = event && event.target && event.target.value;
    const action = events && events[key];
    if (typeof action === 'function') {
      return {
        ...all,
        [`on${capitalize(key)}`]: action(data, event),
      };
    }
    return all;
  }, {});
};
