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
  value: boolean;
  active: boolean;
}

export interface IToggleProps {
  value?: any;
  change?: (value: any) => any;
  children: ({ on, off, toggle, value }: IToggleChildren) => ReactNode;
}

export const Toggle: FunctionComponent<IToggleProps> = ({
  children,
  ...options
}) => {
  const [value, change] = useState<boolean>(options.value);
  useEffect(
    () => {
      change(options.value);
    },
    [options.value]
  );
  const update = (next: boolean) => {
    change(next);
    if (options.change) {
      options.change(next);
    }
  };
  return children({
    on: () => update(true),
    off: () => update(false),
    toggle: override =>
      update(typeof override === 'boolean' ? override : !value),
    value,
    active: value,
  }) as ReactElement<any>;
};

Toggle.displayName = 'Toggle';
