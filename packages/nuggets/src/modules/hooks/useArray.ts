import { useState, useEffect } from 'react';
import { IOptional } from '../../utils/types';

export type IuseArrayOptions = IOptional<{
  value?: any[];
  error?: any;
  change?: (value: any[]) => any;
}>;

export interface IuseArrayProps {
  items: any[];
  add: (item: any, ...args: any[]) => any;
  remove: (item: any | ((item: any) => any), ...args: any[]) => any;
  includes: (item: any | ((item: any) => any), ...args: any[]) => any;
  toggle: (item: any | ((item: any) => any), ...args: any[]) => any;
  error: any;
  use: {
    value: any[];
    change: (value: any[]) => any;
  };
}

export const useArray = (options: IuseArrayOptions = {}): IuseArrayProps => {
  const [value, update] = useState<any[]>(options.value || []);
  useEffect(() => change(options.value), [options.value]);
  const change = (next?: any[]) => {
    const data = next || [];
    update(data);
    if (options.change) {
      options.change(data);
    }
  };
  const add = (item: any) => change([...value, item]);
  const remove = (item: any) => {
    if (typeof item === 'function') {
      change(value.filter(data => !item(data)));
    } else {
      change(value.filter(data => item !== data));
    }
  };
  const includes = (item: any) => {
    if (typeof item === 'function') {
      return !!value.find(data => item(data));
    }
    return !!value.find(data => item === data);
  };
  const toggle = (item: any) => {
    if (includes(item)) {
      remove(item);
    } else {
      add(item);
    }
  };
  return {
    items: value,
    add,
    remove,
    includes,
    toggle,
    error: options.error,
    use: {
      value,
      change,
    },
  };
};
