import { FunctionComponent, ReactNode, useState, useEffect } from 'react';
import { INuggie, createNuggie } from '../utils/nuggie';
import {
  digestSpace,
  digestShadow,
  digestCorners,
  digestBorder,
  digestBackgroundColor,
  digestTransform,
  digestTransition,
  digestSize,
  digestCursor,
  digestText,
  ISpaceDigester,
  IBorderDigester,
  IShadowDigester,
  ICornersDigester,
  IBackgroundColorDigester,
  ISizeDigester,
  ITransformDigester,
  ITransitionDigester,
  ICursorDigester,
  ITextDigester,
} from '../utils/digests';
import {
  happenClick,
  happenChange,
  IClickHappener,
  IChangeHappener,
} from '../utils/happen';

export type IInsertStylesProps = IBackgroundColorDigester &
  IBorderDigester &
  IShadowDigester &
  ICornersDigester &
  ISpaceDigester &
  ISizeDigester &
  ICursorDigester &
  ITransitionDigester &
  ITransformDigester &
  ITextDigester;

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
      digestBackgroundColor,
      digestBorder,
      digestCorners,
      digestShadow,
      digestSpace,
      digestSize,
      digestCursor,
      digestTransition,
      digestTransform,
      digestText,
    ],
  });
};

Insert.displayName = 'Insert';
