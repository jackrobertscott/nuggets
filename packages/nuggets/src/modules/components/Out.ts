import { FunctionComponent, ReactText } from 'react';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { digestTexts, ITextsDigester } from '../../styles/texts';
import { createCSSFromProps } from '../../utils/styles';

export type IOutProps = INuggieProps<ITextsDigester> & {
  value?: ReactText | ReactText[];
  adjust?: (value: ReactText | ReactText[]) => ReactText | ReactText[];
};

export const Out: FunctionComponent<IOutProps> = ({
  adjust,
  styles = {},
  ...options
}) => {
  const value = String(options.value || '');
  const children = typeof adjust === 'function' ? adjust(value) : value;
  return createNuggie({
    children,
    emote: createCSSFromProps(styles, digestTexts),
    ...options,
  });
};

Out.displayName = 'Out';
