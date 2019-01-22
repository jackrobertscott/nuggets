import { useState, useEffect } from 'react';
import { FunctionHook } from '../../utils/types';

export interface IuseNumberProps {
  value?: any;
  change?: (value: number) => any;
}

export interface IuseNumberChildren {
  value: any;
  change: (value: any) => any;
}

export const useNumber: FunctionHook<
  IuseNumberProps,
  IuseNumberChildren
> = options => {
  const [value, change] = useState<number>(options.value);
  useEffect(() => update(options.value), [options.value]);
  const update = (next?: any) => {
    const data = Number(next || '');
    change(data);
    if (options.change) {
      options.change(data);
    }
  };
  return {
    value,
    change: update,
  };
};
