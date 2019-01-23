import { IEventsExecuter } from './types';
import { capitalize } from './helpers';

export interface IEvents {
  [on: string]: (event: any) => any;
}

export interface IEventsOptions {
  [eventType: string]: IEventsExecuter<any>;
}

export type IcreateEvents = (events?: IEventsOptions) => IEvents;

export const createEvents: IcreateEvents = (events = {}) => {
  return Object.keys(events).reduce((handlers, name) => {
    const handler = (event: any) => {
      const value = event && event.target && event.target.value;
      events[name](value, event);
    };
    return {
      ...handlers,
      [`on${capitalize(name)}`]: handler,
    };
  }, {});
};
