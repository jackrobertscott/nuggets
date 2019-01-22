import { useState, useEffect } from 'react';
import { FunctionHook } from '../../utils/types';

export interface IuseNumberOptions {
  value?: any;
  change?: (value: number) => any;
  adjust?: (value: number) => number;
}

export interface IuseNumberProps {
  value: any;
  change: (value: any) => any;
}

export const useNumber: FunctionHook<
  IuseNumberOptions,
  IuseNumberProps
> = options => {
  const [value, update] = useState<number>(options.value || 0);
  useEffect(() => change(options.value), [options.value]);
  const change = (next?: any) => {
    const nice = Number(next || 0);
    const data = options.adjust ? options.adjust(nice) : nice;
    update(data);
    if (options.change) {
      options.change(data);
    }
  };
  return {
    value,
    change,
  };
};
