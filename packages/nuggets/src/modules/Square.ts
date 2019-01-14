import { FunctionComponent, ReactElement } from 'react';
import {
  digestSpace,
  digestShadow,
  digestCorners,
  digestBorder,
  digestBackgroundColor,
  ISpaceDigester,
  IBorderDigester,
  IShadowDigester,
  ICornersDigester,
  IBackgroundColorDigester,
  digestOrbit,
  IOrbitDigester,
  digestSize,
  ISizeDigester,
} from '../utils/digests';
import { INuggie, createNuggie } from '../utils/nuggie';
import { happenClick, IClickHappener } from '../utils/happen';

export type ISquareStylesProps = IBackgroundColorDigester &
  IBorderDigester &
  IShadowDigester &
  ICornersDigester &
  IOrbitDigester &
  ISpaceDigester &
  ISizeDigester;

export type ISquareEventsProps = IClickHappener;

export type ISquareProps = {
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INuggie<ISquareStylesProps, ISquareEventsProps>;

export const Square: FunctionComponent<ISquareProps> = ({
  children,
  ...options
}) => {
  return createNuggie<ISquareStylesProps, ISquareEventsProps>({
    children,
    options,
    events: [happenClick()],
    styles: [
      digestBackgroundColor,
      digestBorder,
      digestCorners,
      digestShadow,
      digestOrbit,
      digestSpace,
      digestSize,
    ],
  });
};

Square.displayName = 'Square';
