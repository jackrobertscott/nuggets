import { FunctionComponent, ReactElement } from 'react';
import { digestDirection, IDirectionDigester } from '../utils/digests';
import { createNuggie, INuggie } from '../utils/nuggie';
import { happenClick, IClickHappener } from '../utils/happen';

export type ILinearStylesProps = IDirectionDigester;

export type ILinearEventsProps = IClickHappener;

export type ILinearProps = {
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INuggie<ILinearStylesProps, ILinearEventsProps>;

export const Linear: FunctionComponent<ILinearProps> = ({
  children,
  ...options
}) => {
  return createNuggie<ILinearStylesProps, ILinearEventsProps>({
    children,
    options,
    events: [happenClick()],
    styles: [
      () => ({
        flexGrow: 1,
        display: 'flex',
        overflow: 'auto',
        '& > *': {
          flexGrow: 1,
        },
      }),
      digestDirection,
    ],
  });
};

Linear.displayName = 'Linear';
