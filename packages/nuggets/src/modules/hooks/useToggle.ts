import { useState, useEffect } from 'react';
import { FunctionHook } from '../../utils/types';

export interface IuseToggleOptions {
  value?: any;
  change?: (value: boolean) => any;
}

export interface IuseToggleProps {
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
  IuseToggleOptions,
  IuseToggleProps
> = options => {
  const [value, update] = useState<boolean>(!!options.value || false);
  useEffect(() => change(options.value), [options.value]);
  const change = (next: boolean) => {
    const data = !!next || false;
    update(data);
    if (options.change) {
      options.change(data);
    }
  };
  const on = () => change(true);
  const off = () => change(false);
  const toggle = (override?: boolean) => {
    change(typeof override === 'boolean' ? override : !value);
  };
  return {
    active: value,
    on,
    off,
    toggle,
    use: {
      value,
      change,
    },
  };
};
