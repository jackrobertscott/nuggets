import { useState, useEffect } from 'react';
import { FunctionHook } from '../../utils/types';

export interface IuseToggleProps {
  value?: any;
  change?: (value: any) => any;
}

export interface IuseToggleChildren {
  on: (...args: any[]) => any;
  off: (...args: any[]) => any;
  toggle: (override?: boolean, ...args: any[]) => any;
  active: boolean;
  use: {
    value: boolean;
    change: (value: boolean) => any;
  };
}

export const useToggle: FunctionHook<
  IuseToggleProps,
  IuseToggleChildren
> = options => {
  const [value, change] = useState<boolean>(options.value);
  useEffect(() => update(options.value), [options.value]);
  const update = (next: boolean) => {
    const data = next || false;
    change(data);
    if (options.change) {
      options.change(data);
    }
  };
  return {
    on: () => update(true),
    off: () => update(false),
    toggle: (override?: boolean) =>
      update(typeof override === 'boolean' ? override : !value),
    active: value,
    use: {
      value,
      change: update,
    },
  };
};
