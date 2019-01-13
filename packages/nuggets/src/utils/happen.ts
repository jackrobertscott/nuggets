import { IEventsExecuter } from './events';

/**
 * Click.
 */
export interface IClickHappener {
  click?: IEventsExecuter;
}
export const happenClick = ({ click }: IClickHappener) => {
  return click ? { onClick: (event: any) => click({ event }) } : {};
};

/**
 * Change.
 */
export interface IChangeHappener {
  change?: IEventsExecuter;
}
export const happenChange = ({ change }: IChangeHappener) => {
  return change ? { onChange: (event: any) => change({ event }) } : {};
};
