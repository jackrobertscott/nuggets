import { capitalize } from './helpers';

export interface IListeners {
  [name: string]: (event: any) => any;
}

export type IExecuter = (value: any, event?: any) => any;

export interface IEvents {
  [eventType: string]: IExecuter | null | undefined;
}

export type IcreateEvents = (events?: IEvents) => IListeners;

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
