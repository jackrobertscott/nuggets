import { FunctionComponent } from 'react';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { createCSSFromProps, IStylesOptions } from '../../utils/styles';
import { digestShape, IShapeDigester } from '../../styles/shape';
import { INonTextChildren } from '../../utils/types';

export type IFrameProps = INuggieProps<IShapeDigester> & {
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
  /**
   * Decision: don't add text styles to frame - classes break down
   * when it comes to class specifity as frame text styles always
   * override the direct text styles.
   */
  return createNuggie({
    children,
    precss,
    classname: 'frame',
    emote: createCSSFromProps(styles, digestShape),
    ...options,
  });
};

Frame.displayName = 'Frame';
