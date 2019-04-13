import { FunctionComponent } from 'react';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { createCSSFromProps, IStylesOptions } from '../../utils/styles';
import { digestShape, IShapeDigester } from '../../styles/shape';
import { INonTextChildren } from '../../utils/types';
import { ITextsDigester, digestTexts } from '../../styles/texts';

export type IFrameProps = INuggieProps<IShapeDigester> & {
  children?: INonTextChildren;
  textStyles?: IStylesOptions<ITextsDigester>;
};

export const Frame: FunctionComponent<IFrameProps> = ({
  children,
  styles = {},
  textStyles = {},
  ...options
}) => {
  const precss = {
    display: 'flex',
    position: 'relative',
  };
  return createNuggie({
    children,
    precss,
    classname: 'frame',
    emote: {
      ...createCSSFromProps(styles, digestShape),
      ...createCSSFromProps(textStyles, digestTexts, '.css-text-nuggets'),
    },
    ...options,
  });
};

Frame.displayName = 'Frame';
