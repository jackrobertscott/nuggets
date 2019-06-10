import { useState, useEffect } from 'react';

export interface IuseStringOptions {
  value?: any;
  change?: (value: string) => any;
  adjust?: (value: string) => string;
  error?: any;
}

export interface IuseStringProps {
  value: any;
  change: (value: any) => any;
  error: any;
}

export const useString = ({
  value,
  adjust,
  change,
  error,
}: IuseStringOptions = {}): IuseStringProps => {
  const [state, update] = useState<string>(value || '');
  useEffect(() => patch(value), [value]);
  const patch = (next?: any) => {
    const nice = String(next || '');
    const data = adjust ? adjust(nice) : nice;
    update(data);
    if (change) {
      change(data);
    }
  };
  return {
    value: state,
    change: patch,
    error,
  };
};
