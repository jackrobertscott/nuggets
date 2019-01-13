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

export type IInsertEventsProps = IClickHappener & IChangeHappener<string>;

export type IInsertProps = INuggie<IInsertStylesProps, IInsertEventsProps> & {
  value?: string;
};

export const Insert: FunctionComponent<IInsertProps> = ({
  children,
  ...options
}) => {
  const [value, change] = useState<string>(options.value || '');
  useEffect(
    () => {
      change(options.value || '');
    },
    [options.value]
  );
  return createNuggie<IInsertStylesProps, IInsertEventsProps>({
    children,
    options,
    extras: { value },
    events: [happenClick(), happenChange(eventValue => change(eventValue))],
    styles: [digestText],
  });
};

Insert.displayName = 'Insert';
