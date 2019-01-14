import {
  FunctionComponent,
  ReactNode,
  useState,
  useEffect,
  ReactElement,
} from 'react';

export interface IDatetimeChildrenChanger {
  value: number | string;
  change: (value: number | string) => any;
}

export interface IDatetimeChildren {
  year: IDatetimeChildrenChanger;
  month: IDatetimeChildrenChanger;
  date: IDatetimeChildrenChanger;
  hours: IDatetimeChildrenChanger;
  minutes: IDatetimeChildrenChanger;
  seconds: IDatetimeChildrenChanger;
  milliseconds: IDatetimeChildrenChanger;
  use: {
    value: Date;
    change: (value: Date) => any;
  };
}

export interface IDatetimeProps {
  value?: Date;
  change?: (value: Date) => any;
  children: ({ use }: IDatetimeChildren) => ReactNode;
}

export const Datetime: FunctionComponent<IDatetimeProps> = ({
  children,
  ...options
}) => {
  const [value, change] = useState<Date>(options.value || new Date());
  useEffect(() => update(options.value), [options.value]);
  const update = (next?: Date) => {
    const data = next || new Date();
    change(data);
    if (options.change) {
      options.change(data);
    }
  };
  const make = (type: string) => ({
    value: (value as any)[`get${type}`](),
    format: (next: number | string) => Number(next),
    change: (next: number | string) => {
      (value as any)[`set${type}`](Number(next));
      update(new Date(value.valueOf()));
    },
  });
  return children({
    year: make('Year'),
    month: make('Month'),
    date: make('Date'),
    hours: make('Hours'),
    minutes: make('Minutes'),
    seconds: make('Seconds'),
    milliseconds: make('Milliseconds'),
    use: {
      value,
      change: update,
    },
  }) as ReactElement<any>;
};

Datetime.displayName = 'Datetime';
