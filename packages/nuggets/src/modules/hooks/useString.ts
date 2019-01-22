import { useState, useEffect } from 'react';
import { FunctionHook } from '../../utils/types';

export interface IuseStringProps {
  value?: any;
  change?: (value: string) => any;
}

export interface IuseStringChildren {
  value: any;
  change: (value: any) => any;
}

export const useString: FunctionHook<
  IuseStringProps,
  IuseStringChildren
> = options => {
  const [value, change] = useState<string>(options.value);
  useEffect(() => update(options.value), [options.value]);
  const update = (next?: any) => {
    const data = String(next || '');
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
