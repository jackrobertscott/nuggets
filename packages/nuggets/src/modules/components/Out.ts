import { FunctionComponent, ReactText } from 'react';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { digestTexts, ITextsDigester } from '../../styles/texts';
import { createCSSFromProps } from '../../utils/styles';

export type IOutProps = INuggieProps<ITextsDigester> & {
  value?: ReactText | ReactText[];
  scrollable?: boolean;
};

export const Out: FunctionComponent<IOutProps> = ({
  styles = {},
  scrollable = true,
  ...options
}) => {
  const children = String(options.value || '');
  const precss = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: scrollable ? 'auto' : 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
  return createNuggie({
    children,
    precss,
    emote: createCSSFromProps(styles, digestTexts),
    ...options,
  });
};

Out.displayName = 'Out';
