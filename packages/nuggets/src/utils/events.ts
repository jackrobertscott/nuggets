import { IEventsExecuter } from './types';
import { capitalize } from './helpers';

export interface IEvents {
  [on: string]: (event: any) => any;
}

export interface IEventsOptions {
  [eventType: string]: IEventsExecuter<any> | null | undefined;
}

export type IcreateEvents = (events?: IEventsOptions) => IEvents;

export const createEvents: IcreateEvents = (events = {}) => {
  return Object.keys(events).reduce((handlers, name) => {
    const cb = events[name];
    if (!cb) {
      return handlers;
    }
    const handler = (event: any) => {
      const value = event && event.target && event.target.value;
      cb(value, event);
    };
    return {
      ...handlers,
      [`on${capitalize(name)}`]: handler,
    };
  }, {});
};
