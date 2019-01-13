import { IEventsExecuter } from './events';

/**
 * Click.
 */
export interface IClickHappener {
  click?: IEventsExecuter;
}
export const happenClick = ({ click }: IClickHappener) => {
  return click ? { onClick: (event: any) => click && click({ event }) } : {};
};

/**
 * Change.
 */
export interface IClickHappener {
  change?: IEventsExecuter;
}
export const happenChange = ({ change }: IClickHappener) => {
  return change ? { onChange: (event: any) => change({ event }) } : {};
};
