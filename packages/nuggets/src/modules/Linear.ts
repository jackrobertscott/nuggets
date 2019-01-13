import { FunctionComponent, ReactElement } from 'react';
import { createDomPiece, INugget } from '../utils/dom';
import { createCSSFromDigests, IDigestArray } from '../utils/styles';
import { createEvents, IEvents } from '../utils/events';
import {
  digestOverrides,
  IOverridesDigest,
  IDirectionDigest,
  digestDirection,
} from '../utils/digests';

export type ILinearProps = {
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INugget<ILinearStyles, IEvents>;

export const Linear: FunctionComponent<ILinearProps> = ({
  children,
  ...options
}) => {
  return createDomPiece({
    children,
    options,
    attrs: createEvents(options),
    css: createCSSFromDigests<ILinearStyles>(options, digests),
  });
};

Linear.displayName = 'Linear';

export type ILinearStyles = IDirectionDigest & IOverridesDigest;

const digests: IDigestArray<ILinearStyles> = [
  () => ({
    flexGrow: 1,
    display: 'flex',
    overflow: 'auto',
  }),
  digestDirection,
  digestOverrides,
];
