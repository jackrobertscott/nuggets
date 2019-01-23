import { FunctionComponent, useState, useEffect } from 'react';
import { INuggie, createNuggie } from '../../utils/dom';
import {
  happenClick,
  happenChange,
  IClickHappener,
  IChangeHappener,
} from '../../utils/happen';

export type IInEventsProps = IClickHappener & IChangeHappener<string | number>;

export type IInProps = INuggie<{}, IInEventsProps>;

export const In: FunctionComponent<IInProps> = ({ children, ...options }) => {
  const [value, change] = useState<string>(String(options.value || ''));
  useEffect(() => update(options.value), [options.value]);
  const update = (next?: string | number) => {
    const data = String(next || '');
    change(data);
    if (options.change) {
      options.change(data, {});
    }
  };
  return createNuggie<{}, IInEventsProps>({
    type: 'input',
    children,
    options,
    extras: { value },
    events: [happenClick(), happenChange(change)],
    styles: [
      () => ({
        width: '100%',
      }),
    ],
  });
};

In.displayName = 'In';
