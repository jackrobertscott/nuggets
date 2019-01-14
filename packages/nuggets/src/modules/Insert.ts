import { FunctionComponent, useState, useEffect } from 'react';
import { createNuggie, INuggie } from '../utils/nuggie';
import {
  happenClick,
  IClickHappener,
  happenChange,
  IChangeHappener,
} from '../utils/happen';
import { ITextDigester, digestText } from '../utils/digests';

export type IInsertStylesProps = ITextDigester;

export type IInsertEventsProps = IClickHappener &
  IChangeHappener<string | number>;

export type IInsertProps = INuggie<IInsertStylesProps, IInsertEventsProps>;

export const Insert: FunctionComponent<IInsertProps> = ({
  children,
  ...options
}) => {
  const [value, change] = useState<string>(String(options.value || ''));
  useEffect(() => update(options.value), [options.value]);
  const update = (next?: string | number) => {
    const data = String(next || '');
    change(data);
    if (options.change) {
      options.change(data, {});
    }
  };
  return createNuggie<IInsertStylesProps, IInsertEventsProps>({
    type: 'input',
    children,
    options,
    extras: { value },
    events: [happenClick(), happenChange(change)],
    styles: [
      () => ({
        width: '100%',
      }),
      digestText,
    ],
  });
};

Insert.displayName = 'Insert';
