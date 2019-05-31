import { useState, useEffect } from 'react';

export interface IuseToggleOptions {
  value?: any;
  change?: (value: boolean) => any;
  error?: any;
}

export interface IuseToggleProps {
  value: boolean;
  change: (value: boolean) => any;
  on: (...args: any[]) => any;
  off: (...args: any[]) => any;
  toggle: (override?: boolean, ...args: any[]) => any;
  error: any;
}

export const useToggle = ({
  value,
  change,
  error,
}: IuseToggleOptions = {}): IuseToggleProps => {
  const [state, update] = useState<boolean>(!!value || false);
  useEffect(() => mutate(value), [value]);
  const mutate = (next: boolean) => {
    const data = !!next || false;
    update(data);
    if (change) {
      change(data);
    }
  };
  const on = () => mutate(true);
  const off = () => mutate(false);
  const toggle = (override?: boolean) => {
    mutate(typeof override === 'boolean' ? override : !state);
  };
  return {
    value: state,
    change: mutate,
    on,
    off,
    toggle,
    error,
  };
};
