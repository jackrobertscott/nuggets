import { FunctionComponent, ReactElement } from 'react';
import { createDomPiece, INugget } from '../utils/dom';
import { createCSSFromDigests, IDigestArray } from '../utils/styles';
import { createEvents, IEvents } from '../utils/events';
import {
  digestPadding,
  digestShadow,
  digestCorners,
  digestBorder,
  digestBackgroundColor,
  digestOverrides,
  IPaddingDigest,
  IBorderDigest,
  IShadowDigest,
  ICornersDigest,
  IBackgroundColorDigest,
  IOverridesDigest,
} from '../utils/digests';

export type ISquareProps = {
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INugget<ISquareStyles, IEvents>;

export const Square: FunctionComponent<ISquareProps> = ({
  children,
  ...options
}) => {
  return createDomPiece({
    children,
    options,
    attrs: createEvents(options),
    css: createCSSFromDigests<ISquareStyles>(options, digests),
  });
};

Square.displayName = 'Square';

export type ISquareStyles = IBackgroundColorDigest &
  IPaddingDigest &
  IBorderDigest &
  IShadowDigest &
  ICornersDigest &
  IOverridesDigest;

const digests: IDigestArray<ISquareStyles> = [
  digestBackgroundColor,
  digestBorder,
  digestCorners,
  digestShadow,
  digestPadding,
  digestOverrides,
];
