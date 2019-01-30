import { FunctionComponent, ReactText } from 'react';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { digestTexts, ITextsDigester } from '../../styles/texts';
import { createCSSFromProps } from '../../utils/styles';

export type IOutProps = INuggieProps<ITextsDigester> & {
  value?: ReactText | ReactText[];
};

export const Out: FunctionComponent<IOutProps> = ({
  styles = {},
  ...options
}) => {
  const children = String(options.value || '');
  const precss = {
    position: 'relative',
  };
  return createNuggie({
    children,
    precss,
    emote: createCSSFromProps(styles, digestTexts),
    ...options,
  });
};

Out.displayName = 'Out';
