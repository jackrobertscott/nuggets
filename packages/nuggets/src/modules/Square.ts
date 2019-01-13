import { FunctionComponent, ReactElement } from 'react';
import {
  digestPadding,
  digestShadow,
  digestCorners,
  digestBorder,
  digestBackgroundColor,
  IPaddingDigester,
  IBorderDigester,
  IShadowDigester,
  ICornersDigester,
  IBackgroundColorDigester,
} from '../utils/digests';
import { INuggie, createNuggie } from '../utils/nuggie';
import { happenClick, IClickHappener } from '../utils/happen';

export type ISquareStylesProps = IBackgroundColorDigester &
  IPaddingDigester &
  IBorderDigester &
  IShadowDigester &
  ICornersDigester;

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
      digestPadding,
    ],
  });
};

Square.displayName = 'Square';
