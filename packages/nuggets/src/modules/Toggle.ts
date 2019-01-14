import {
  FunctionComponent,
  ReactNode,
  useState,
  useEffect,
  ReactElement,
} from 'react';

export interface IToggleChildren {
  on: (...args: any[]) => any;
  off: (...args: any[]) => any;
  toggle: (override?: boolean, ...args: any[]) => any;
  active: boolean;
  use: {
    value: boolean;
    change: (value: boolean) => any;
  };
}

export interface IToggleProps {
  value?: any;
  change?: (value: any) => any;
  children: ({ on, off, toggle, use }: IToggleChildren) => ReactNode;
}

export const Toggle: FunctionComponent<IToggleProps> = ({
  children,
  ...options
}) => {
  const [value, change] = useState<boolean>(options.value);
  useEffect(() => update(options.value), [options.value]);
  const update = (next: boolean) => {
    const data = next || false;
    change(data);
    if (options.change) {
      options.change(data);
    }
  };
  return children({
    on: () => update(true),
    off: () => update(false),
    toggle: override =>
      update(typeof override === 'boolean' ? override : !value),
    active: value,
    use: {
      value,
      change: update,
    },
  }) as ReactElement<any>;
};

Toggle.displayName = 'Toggle';
