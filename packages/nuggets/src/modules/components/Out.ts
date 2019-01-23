import { FunctionComponent, ReactText } from 'react';
import { INuggie, createNuggie } from '../../utils/dom';
import { happenClick, IClickHappener } from '../../utils/happen';

export type IOutEventsProps = IClickHappener;

export type IOutProps = {
  value?: ReactText | ReactText[];
  format?: (value: ReactText | ReactText[]) => ReactText | ReactText[];
} & INuggie<{}, IOutEventsProps>;

export const Out: FunctionComponent<IOutProps> = ({ format, ...options }) => {
  const value = String(options.value || '');
  return createNuggie<{}, IOutEventsProps>({
    children: typeof format === 'function' ? format(value) : value,
    options,
    events: [happenClick()],
    styles: [],
  });
};

Out.displayName = 'Out';
