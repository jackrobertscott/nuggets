import { IEventsExecuter } from './events';

export type IUpdate = (value: any, { event }: { event: any }) => any;

/**
 * Click.
 */
export interface IClickHappener {
  click?: IEventsExecuter<boolean>;
}
export const happenClick = (update?: IUpdate) => {
  return ({ click }: IClickHappener) => ({
    onClick(event: any) {
      const data = {
        event,
        exact: event.currentTarget === event.target,
      };
      if (click) {
        click(data.exact, data);
      }
      if (update) {
        update(data.exact, data);
      }
    },
  });
};

/**
 * Change.
 */
export interface IChangeHappener<E> {
  change?: IEventsExecuter<E>;
  format?: (value: E) => E;
  value?: E;
}
export const happenChange = <E>(update?: IUpdate) => {
  return ({ change, format }: IChangeHappener<E>) => ({
    onChange(event: any) {
      const value = event.target.value;
      const data = {
        event,
        value: format ? format(value) : value,
      };
      if (change) {
        change(data.value, data);
      }
      if (update) {
        update(data.value, data);
      }
    },
  });
};
