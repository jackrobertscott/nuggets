import { useState, useEffect } from 'react';

export interface IuseNumberOptions {
  value?: any;
  error?: any;
  change?: (value: number) => any;
  adjust?: (value: number) => number;
}

export interface IuseNumberProps {
  value: any;
  error: any;
  change: (value: any) => any;
}

export const useNumber = ({
  value,
  adjust,
  change,
  error,
}: IuseNumberOptions = {}): IuseNumberProps => {
  const [state, update] = useState<number>(value || 0);
  useEffect(() => mutate(value), [value]);
  const mutate = (next?: any) => {
    const nice = Number(next || 0);
    const data = adjust ? adjust(nice) : nice;
    update(data);
    if (change) {
      change(data);
    }
  };
  return {
    value: state,
    change: mutate,
    error,
  };
};
