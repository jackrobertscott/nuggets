import { FunctionComponent, ReactElement } from 'react';
import {
  digestSpace,
  digestShadow,
  digestCorners,
  digestBorder,
  digestBackgroundColor,
  digestTransform,
  digestTransition,
  digestSize,
  digestCursor,
  digestText,
  ISpaceDigester,
  IBorderDigester,
  IShadowDigester,
  ICornersDigester,
  IBackgroundColorDigester,
  ISizeDigester,
  ITransformDigester,
  ITransitionDigester,
  ICursorDigester,
  ITextDigester,
} from '../../utils/digests';
import { INuggie, createNuggie } from '../../utils/nuggie';
import { happenClick, IClickHappener } from '../../utils/happen';

export type ISquareStylesProps = IBackgroundColorDigester &
  IBorderDigester &
  IShadowDigester &
  ICornersDigester &
  ISpaceDigester &
  ISizeDigester &
  ICursorDigester &
  ITransitionDigester &
  ITransformDigester &
  ITextDigester;

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
      () => ({
        display: 'flex',
      }),
      digestBackgroundColor,
      digestBorder,
      digestCorners,
      digestShadow,
      digestSpace,
      digestSize,
      digestCursor,
      digestTransition,
      digestTransform,
      digestText,
    ],
  });
};

Square.displayName = 'Square';
