import { FunctionComponent, ReactText } from 'react';
import { createDomPiece, INugget } from '../utils/dom';
import { createCSSFromDigests, IDigestArray } from '../utils/styles';
import { createEvents, IEvents } from '../utils/events';
import {
  digestText,
  digestOverrides,
  IOverridesDigest,
  ITextDigest,
} from '../utils/digests';

export type ITextProps = {
  children?: ReactText | ReactText[];
} & INugget<ITextStyles, IEvents>;

export const Text: FunctionComponent<ITextProps> = ({
  children,
  ...options
}) => {
  return createDomPiece({
    children,
    options,
    attrs: createEvents(options),
    css: createCSSFromDigests<ITextStyles>(options, digests),
  });
};

Text.displayName = 'Text';

export type ITextStyles = ITextDigest & IOverridesDigest;

const digests: IDigestArray<ITextStyles> = [digestText, digestOverrides];
