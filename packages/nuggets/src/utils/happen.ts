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
      const data = { event };
      const clickOnExactObject = true; // todo
      if (click) {
        click(clickOnExactObject, data);
      }
      if (update) {
        update(clickOnExactObject, data);
      }
    },
  });
};

/**
 * Change.
 */
export interface IChangeHappener<E> {
  change?: IEventsExecuter<E>;
}
export const happenChange = <E>(update?: IUpdate) => {
  return ({ change }: IChangeHappener<E>) => ({
    onChange(event: any) {
      const data = {
        event,
        value: event.target.value || '',
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
