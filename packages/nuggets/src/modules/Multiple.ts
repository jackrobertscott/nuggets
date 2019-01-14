import {
  FunctionComponent,
  ReactNode,
  useState,
  useEffect,
  ReactElement,
} from 'react';

export interface IMultipleChildren {
  add: (item: any, ...args: any[]) => any;
  remove: (item: any | ((item: any) => any), ...args: any[]) => any;
  includes: (item: any | ((item: any) => any), ...args: any[]) => any;
  toggle: (item: any | ((item: any) => any), ...args: any[]) => any;
  value: any[];
}

export interface IMultipleProps {
  value?: any[];
  change?: (value: any[]) => any;
  children: (
    { add, remove, includes, toggle, value }: IMultipleChildren
  ) => ReactNode;
}

export const Multiple: FunctionComponent<IMultipleProps> = ({
  children,
  ...options
}) => {
  const [value, change] = useState<any[]>(options.value || []);
  useEffect(
    () => {
      change(options.value || []);
    },
    [options.value]
  );
  const update = (next: any[]) => {
    change(next);
    if (options.change) {
      options.change(next);
    }
  };
  const add = (item: any) => update([...value, item]);
  const remove = (item: any) => {
    if (typeof item === 'function') {
      update(value.filter(data => !item(data)));
    } else {
      update(value.filter(data => item !== data));
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
  return children({
    add,
    remove,
    includes,
    toggle,
    value,
  }) as ReactElement<any>;
};

Multiple.displayName = 'Multiple';
