import { FunctionComponent, ReactNode } from 'react';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { createCSSFromProps } from '../../utils/styles';
import { digestShape, IShapeDigester } from '../../styles/shape';

export type IFrameProps = INuggieProps<IShapeDigester> & {
  children?: ReactNode;
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
    classname: 'frame',
    precss,
    emote: createCSSFromProps(styles, digestShape),
    ...options,
  });
};

Frame.displayName = 'Frame';
