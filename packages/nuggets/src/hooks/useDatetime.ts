import { useState, useEffect } from 'react';

export interface IuseDatetimeOperate {
  value: number | string;
  change: (value: number | string) => any;
}

export interface IuseDatetimeOptions {
  value?: Date;
  change?: (value: Date) => any;
  error?: any;
}

export interface IuseDatetimeProps {
  value: Date;
  change: (value: Date) => any;
  year: IuseDatetimeOperate;
  month: IuseDatetimeOperate;
  date: IuseDatetimeOperate;
  hours: IuseDatetimeOperate;
  minutes: IuseDatetimeOperate;
  seconds: IuseDatetimeOperate;
  milliseconds: IuseDatetimeOperate;
  error: any;
}

export const useDatetime = ({
  value,
  change,
  error,
}: IuseDatetimeOptions = {}): IuseDatetimeProps => {
  const [state, update] = useState<Date>(value || new Date());
  useEffect(() => patch(value), [value]);
  const patch = (next?: Date) => {
    const data = next || new Date();
    update(data);
    if (change) {
      change(data);
    }
  };
  const operate = (type: string) => ({
    value: (state as any)[`get${type}`](),
    adjust: (next: number | string) => Number(next),
    change: (next: number | string) => {
      (state as any)[`set${type}`](Number(next));
      patch(new Date(state.valueOf()));
    },
  });
  return {
    value: state,
    change: patch,
    year: operate('Year'),
    month: operate('Month'),
    date: operate('Date'),
    hours: operate('Hours'),
    minutes: operate('Minutes'),
    seconds: operate('Seconds'),
    milliseconds: operate('Milliseconds'),
    error,
  };
};
