import { FunctionComponent, ReactElement } from 'react';
import { digestFlex, IFlexDigester } from '../../utils/digests';
import { createNuggie, INuggie } from '../../utils/nuggie';
import { happenClick, IClickHappener } from '../../utils/happen';

export type IArrangeStylesProps = IFlexDigester;

export type IArrangeEventsProps = IClickHappener;

export type IArrangeProps = {
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INuggie<IArrangeStylesProps, IArrangeEventsProps>;

export const Arrange: FunctionComponent<IArrangeProps> = ({
  children,
  ...options
}) => {
  return createNuggie<IArrangeStylesProps, IArrangeEventsProps>({
    children,
    options,
    events: [happenClick()],
    styles: [digestFlex],
  });
};

Arrange.displayName = 'Arrange';
