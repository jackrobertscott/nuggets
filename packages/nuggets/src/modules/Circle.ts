import { FunctionComponent, ReactElement } from 'react';
import {
  digestShadow,
  digestBorder,
  digestBackgroundColor,
  digestDiameter,
  IBorderDigester,
  IShadowDigester,
  IDiameterDigester,
  IBackgroundColorDigester,
  digestSpace,
  ISpaceDigester,
} from '../utils/digests';
import { INuggie, createNuggie } from '../utils/nuggie';
import { happenClick, IClickHappener } from '../utils/happen';

export type ICircleStylesProps = IBackgroundColorDigester &
  IBorderDigester &
  IShadowDigester &
  IDiameterDigester &
  ISpaceDigester;

export type ICircleEventsProps = IClickHappener;

export type ICircleProps = {
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INuggie<ICircleStylesProps, ICircleEventsProps>;

export const Circle: FunctionComponent<ICircleProps> = ({
  children,
  ...options
}) => {
  return createNuggie<ICircleStylesProps, ICircleEventsProps>({
    children,
    options,
    events: [happenClick()],
    styles: [
      digestBackgroundColor,
      digestBorder,
      digestShadow,
      digestDiameter,
      digestSpace,
    ],
  });
};

Circle.displayName = 'Circle';
