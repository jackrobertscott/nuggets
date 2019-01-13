import { FunctionComponent, ReactText } from 'react';
import { digestText, ITextDigester } from '../utils/digests';
import { createNuggie, INuggie } from '../utils/nuggie';

export type ITextStylesProps = ITextDigester;

export interface ITextEventsProps {}

export type ITextProps = {
  children?: ReactText | ReactText[];
} & INuggie<ITextStylesProps, ITextEventsProps>;

export const Text: FunctionComponent<ITextProps> = ({
  children,
  ...options
}) => {
  return createNuggie({
    children,
    options,
    styles: [digestText],
    events: [],
  });
};

Text.displayName = 'Text';
