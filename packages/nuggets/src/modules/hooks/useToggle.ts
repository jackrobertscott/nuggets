import { useState, useEffect } from 'react';
import { IOptional } from '../../utils/types';

export type IuseToggleOptions = IOptional<{
  value?: any;
  error?: any;
  change?: (value: boolean) => any;
}>;

export interface IuseToggleProps {
  on: (...args: any[]) => any;
  off: (...args: any[]) => any;
  toggle: (override?: boolean, ...args: any[]) => any;
  active: boolean;
  error: any;
  use: {
    value: boolean;
    change: (value: boolean) => any;
  };
}

export const useToggle = (options: IuseToggleOptions = {}): IuseToggleProps => {
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
    error: options.error,
    use: {
      value,
      change,
    },
  };
};
