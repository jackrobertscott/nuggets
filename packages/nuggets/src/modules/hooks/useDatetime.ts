import { useState, useEffect } from 'react';
import { FunctionHook } from '../../utils/types';

export interface IuseDatetimeProps {
  value?: Date;
  change?: (value: Date) => any;
}

export interface IuseDatetimeOperate {
  value: number | string;
  change: (value: number | string) => any;
}

export interface IuseDatetimeChildren {
  year: IuseDatetimeOperate;
  month: IuseDatetimeOperate;
  date: IuseDatetimeOperate;
  hours: IuseDatetimeOperate;
  minutes: IuseDatetimeOperate;
  seconds: IuseDatetimeOperate;
  milliseconds: IuseDatetimeOperate;
  use: {
    value: Date;
    change: (value: Date) => any;
  };
}

export const useDatetime: FunctionHook<
  IuseDatetimeProps,
  IuseDatetimeChildren
> = options => {
  const [value, change] = useState<Date>(options.value || new Date());
  useEffect(() => update(options.value), [options.value]);
  const update = (next?: Date) => {
    const data = next || new Date();
    change(data);
    if (options.change) {
      options.change(data);
    }
  };
  const operate = (type: string) => ({
    value: (value as any)[`get${type}`](),
    adjust: (next: number | string) => Number(next),
    change: (next: number | string) => {
      (value as any)[`set${type}`](Number(next));
      update(new Date(value.valueOf()));
    },
  });
  return {
    year: operate('Year'),
    month: operate('Month'),
    date: operate('Date'),
    hours: operate('Hours'),
    minutes: operate('Minutes'),
    seconds: operate('Seconds'),
    milliseconds: operate('Milliseconds'),
    use: {
      value,
      change: update,
    },
  };
};
