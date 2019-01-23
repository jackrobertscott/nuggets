import { FunctionComponent, ReactText } from 'react';
import { INuggieProps, createNuggie } from '../../utils/dom';

export type IOutProps = INuggieProps & {
  value?: ReactText | ReactText[];
  adjust?: (value: ReactText | ReactText[]) => ReactText | ReactText[];
};

export const Out: FunctionComponent<IOutProps> = ({ adjust, ...options }) => {
  const value = String(options.value || '');
  const children = typeof adjust === 'function' ? adjust(value) : value;
  return createNuggie({
    children,
    ...options,
  });
};

Out.displayName = 'Out';
