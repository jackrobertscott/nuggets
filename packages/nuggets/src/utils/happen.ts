import { IEventsExecuter } from './events';

export type IUpdate = (...args: any[]) => any;

/**
 * Click.
 */
export interface IClickHappener {
  click?: IEventsExecuter;
}
export const happenClick = (update?: IUpdate) => {
  return ({ click }: IClickHappener) => ({
    onClick(event: any) {
      const data = { event };
      if (click) {
        click(data);
      }
      if (update) {
        update(data);
      }
    },
  });
};

/**
 * Change.
 */
export interface IChangeHappener {
  change?: IEventsExecuter;
}
export const happenChange = (update?: IUpdate) => {
  return ({ change }: IChangeHappener) => ({
    onChange(event: any) {
      const data = {
        event,
        value: event.target.value || '',
      };
      if (change) {
        change(data);
      }
      if (update) {
        update(data);
      }
    },
  });
};
