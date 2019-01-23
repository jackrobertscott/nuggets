import { useState, useEffect } from 'react';
import { FunctionHook, IOptional } from '../../utils/types';

export type IuseArrayOptions = IOptional<{
  value?: any[];
  change?: (value: any[]) => any;
}>;

export interface IuseArrayProps {
  add: (item: any, ...args: any[]) => any;
  remove: (item: any | ((item: any) => any), ...args: any[]) => any;
  includes: (item: any | ((item: any) => any), ...args: any[]) => any;
  toggle: (item: any | ((item: any) => any), ...args: any[]) => any;
  use: {
    value: any[];
    change: (value: any[]) => any;
  };
}

export const useArray: FunctionHook<IuseArrayOptions, IuseArrayProps> = (
  options = {}
) => {
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
    add,
    remove,
    includes,
    toggle,
    use: {
      value,
      change,
    },
  };
};
