import { FunctionComponent, ReactNode, ReactElement } from 'react';
import {
  digestShadow,
  digestBorder,
  digestBackgroundColor,
  digestDiameter,
  digestSpace,
  digestTransform,
  digestTransition,
  digestCursor,
  digestText,
  IBorderDigester,
  IShadowDigester,
  IDiameterDigester,
  IBackgroundColorDigester,
  ISpaceDigester,
  ICursorDigester,
  ITransitionDigester,
  ITransformDigester,
  ITextDigester,
} from '../../utils/digests';
import { INuggie, createNuggie } from '../../utils/nuggie';
import { happenClick, IClickHappener } from '../../utils/happen';

export type ICircleStylesProps = IBackgroundColorDigester &
  IBorderDigester &
  IShadowDigester &
  IDiameterDigester &
  ISpaceDigester &
  ICursorDigester &
  ITransitionDigester &
  ITransformDigester &
  ITextDigester;

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
      digestSpace,
      digestDiameter,
      digestCursor,
      digestTransition,
      digestTransform,
      digestText,
    ],
  });
};

Circle.displayName = 'Circle';
