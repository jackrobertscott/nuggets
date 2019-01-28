import { FunctionComponent, ReactElement } from 'react';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { createCSSFromProps } from '../../utils/styles';
import { digestShape, IShapeDigester } from '../../styles/shape';

export type IFrameProps = INuggieProps<IShapeDigester> & {
  children?: ReactElement<any> | Array<ReactElement<any>>;
};

export const Frame: FunctionComponent<IFrameProps> = ({
  children,
  styles = {},
  ...options
}) => {
  const precss = {
    display: 'flex',
    position: 'relative',
    transition: '200ms',
  };
  return createNuggie({
    children,
    precss,
    emote: createCSSFromProps(styles, digestShape),
    ...options,
  });
};

Frame.displayName = 'Frame';
