import { FunctionComponent, ReactNode } from 'react';
import {
  digestBackgroundColor,
  IBackgroundColorDigester,
} from '../utils/digests';
import { INuggie, createNuggie } from '../utils/nuggie';

export type ICircleStylesProps = IBackgroundColorDigester;

export interface ICircleEventsProps {}

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
    styles: [digestBackgroundColor],
    events: [],
  });
};

Circle.displayName = 'Circle';
