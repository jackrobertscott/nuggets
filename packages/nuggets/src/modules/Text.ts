import { FunctionComponent, ReactText } from 'react';
import {
  digestObjectText,
  digestTransition,
  digestCursor,
  ITextObjectDigester,
  ITransitionDigester,
  ICursorDigester,
} from '../utils/digests';
import { createNuggie, INuggie } from '../utils/nuggie';
import { happenClick, IClickHappener } from '../utils/happen';

export type ITextStylesProps = ITextObjectDigester &
  ITransitionDigester &
  ICursorDigester;

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
    events: [happenClick()],
    styles: [digestObjectText, digestTransition, digestCursor],
  });
};

Text.displayName = 'Text';
