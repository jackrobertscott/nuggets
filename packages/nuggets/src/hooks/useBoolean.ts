import { useState, useEffect } from 'react';

export interface IuseBooleanOptions {
  value?: any;
  change?: (value: boolean) => any;
  error?: any;
}

export interface IuseBooleanProps {
  value: boolean;
  change: (value: boolean) => any;
  on: (...args: any[]) => any;
  off: (...args: any[]) => any;
  toggle: (override?: boolean, ...args: any[]) => any;
  error: any;
}

export const useBoolean = ({
  value,
  change,
  error,
}: IuseBooleanOptions = {}): IuseBooleanProps => {
  const [state, update] = useState<boolean>(!!value || false);
  useEffect(() => patch(value), [value]);
  const patch = (next: boolean) => {
    const data = !!next || false;
    update(data);
    if (change) {
      change(data);
    }
  };
  const on = () => patch(true);
  const off = () => patch(false);
  const toggle = (override?: boolean) => {
    patch(typeof override === 'boolean' ? override : !state);
  };
  return {
    value: state,
    change: patch,
    on,
    off,
    toggle,
    error,
  };
};
