import { FunctionComponent } from 'react';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { createCSSFromProps } from '../../utils/styles';
import { digestShape, IShapeDigester } from '../../styles/shape';
import { INonTextChildren } from '../../utils/types';
import { digestTexts, ITextsDigester } from '../../styles/texts';

export type IFrameProps = INuggieProps<
  IShapeDigester & { texts?: ITextsDigester }
> & {
  children?: INonTextChildren;
};

export const Frame: FunctionComponent<IFrameProps> = ({
  children,
  styles = {},
  ...options
}) => {
  const precss = {
    display: 'flex',
    position: 'relative',
  };
  const emote = {
    ...createCSSFromProps(styles, digestShape),
    ...createCSSFromProps(styles.texts || {}, digestTexts),
  };
  return createNuggie({
    children,
    precss,
    emote,
    ...options,
  });
};

Frame.displayName = 'Frame';
