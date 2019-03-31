import { useState, useEffect } from 'react';
import { IOptional } from '../../utils/types';

export type IuseStringOptions = IOptional<{
  value?: any;
  error?: any;
  change?: (value: string) => any;
  adjust?: (value: string) => string;
}>;

export interface IuseStringProps {
  value: any;
  error: any;
  change: (value: any) => any;
}

export const useString = (options: IuseStringOptions = {}): IuseStringProps => {
  const [value, update] = useState<string>(options.value || '');
  useEffect(() => change(options.value), [options.value]);
  const change = (next?: any) => {
    const nice = String(next || '');
    const data = options.adjust ? options.adjust(nice) : nice;
    update(data);
    if (options.change) {
      options.change(data);
    }
  };
  return {
    value,
    error: options.error,
    change,
  };
};
