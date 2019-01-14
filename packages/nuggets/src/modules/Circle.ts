import { FunctionComponent, ReactElement } from 'react';
import {
  digestShadow,
  digestBorder,
  digestBackgroundColor,
  digestOrbit,
  digestDiameter,
  IBorderDigester,
  IShadowDigester,
  IDiameterDigester,
  IBackgroundColorDigester,
  IOrbitDigester,
} from '../utils/digests';
import { INuggie, createNuggie } from '../utils/nuggie';
import { happenClick, IClickHappener } from '../utils/happen';

export type ICircleStylesProps = IBackgroundColorDigester &
  IBorderDigester &
  IShadowDigester &
  IDiameterDigester &
  IOrbitDigester;

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
      digestOrbit,
    ],
  });
};

Circle.displayName = 'Circle';
