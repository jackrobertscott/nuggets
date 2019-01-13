import { FunctionComponent, ReactText } from 'react';
import { digestText, ITextDigester } from '../utils/digests';
import { createNuggie, INuggie } from '../utils/nuggie';
import { happenClick, IClickHappener } from '../utils/happen';

export type ITextStylesProps = ITextDigester;

export type ITextEventsProps = IClickHappener;

export type ITextProps = {
  children?: ReactText | ReactText[];
} & INuggie<ITextStylesProps, ITextEventsProps>;

export const Text: FunctionComponent<ITextProps> = ({
  children,
  ...options
}) => {
  return createNuggie<ITextStylesProps, ITextEventsProps>({
    children,
    options,
    events: [happenClick],
    styles: [digestText],
  });
};

Text.displayName = 'Text';
