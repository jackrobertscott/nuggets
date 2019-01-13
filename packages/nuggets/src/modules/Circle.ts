import { FunctionComponent, ReactNode } from 'react';
import {
  digestBackgroundColor,
  IBackgroundColorDigester,
} from '../utils/digests';
import { INuggie, createNuggie } from '../utils/nuggie';
import { happenClick, IClickHappener } from '../utils/happen';

export type ICircleStylesProps = IBackgroundColorDigester;

export type ICircleEventsProps = IClickHappener;

export type ICircleProps = {
  children?: ReactNode;
} & INuggie<ICircleStylesProps, ICircleEventsProps>;

export const Circle: FunctionComponent<ICircleProps> = ({
  children,
  ...options
}) => {
  return createNuggie<ICircleStylesProps, ICircleEventsProps>({
    children,
    options,
    events: [happenClick()],
    styles: [digestBackgroundColor],
  });
};

Circle.displayName = 'Circle';
