import { useState, useEffect } from 'react';
import { FunctionHook, IOptional } from '../../utils/types';

export interface IuseDatetimeOperate {
  value: number | string;
  change: (value: number | string) => any;
}

export type IuseDatetimeOptions = IOptional<{
  value?: Date;
  change?: (value: Date) => any;
}>;

export interface IuseDatetimeProps {
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
  IuseDatetimeOptions,
  IuseDatetimeProps
> = (options = {}) => {
  const [value, update] = useState<Date>(options.value || new Date());
  useEffect(() => change(options.value), [options.value]);
  const change = (next?: Date) => {
    const data = next || new Date();
    update(data);
    if (options.change) {
      options.change(data);
    }
  };
  const operate = (type: string) => ({
    value: (value as any)[`get${type}`](),
    adjust: (next: number | string) => Number(next),
    change: (next: number | string) => {
      (value as any)[`set${type}`](Number(next));
      change(new Date(value.valueOf()));
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
      change,
    },
  };
};
