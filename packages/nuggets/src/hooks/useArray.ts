import { useState, useEffect } from 'react';

export interface IuseArrayOptions {
  value?: any[];
  change?: (value: any[]) => any;
  error?: any;
}

export interface IuseArrayProps {
  value: any[];
  change: (value: any[]) => any;
  add: (item: any, ...args: any[]) => any;
  remove: (item: any | ((item: any) => any), ...args: any[]) => any;
  includes: (item: any | ((item: any) => any), ...args: any[]) => any;
  toggle: (item: any | ((item: any) => any), ...args: any[]) => any;
  error: any;
}

export const useArray = ({
  value,
  change,
  error,
}: IuseArrayOptions = {}): IuseArrayProps => {
  const [state, update] = useState<any[]>(value || []);
  useEffect(() => mutate(value), [value]);
  const mutate = (next?: any[]) => {
    const data = next || [];
    update(data);
    if (change) {
      change(data);
    }
  };
  const add = (item: any) => mutate([...state, item]);
  const remove = (item: any) => {
    if (typeof item === 'function') {
      mutate(state.filter(data => !item(data)));
    } else {
      mutate(state.filter(data => item !== data));
    }
  };
  const includes = (item: any) => {
    if (typeof item === 'function') {
      return !!state.find(data => item(data));
    }
    return !!state.find(data => item === data);
  };
  const toggle = (item: any) => {
    if (includes(item)) {
      remove(item);
    } else {
      add(item);
    }
  };
  return {
    value: state,
    change: mutate,
    add,
    remove,
    includes,
    toggle,
    error,
  };
};
