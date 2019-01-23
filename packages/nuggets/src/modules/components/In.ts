import { FunctionComponent, useState, useEffect } from 'react';
import { INuggieProps, createNuggie } from '../../utils/dom';
import { IEventsExecuter } from '../../utils/types';

export type IInProps = INuggieProps & {
  value?: string | number;
  change?: IEventsExecuter<string | number>;
  wrap?: number;
};

export const In: FunctionComponent<IInProps> = ({
  children,
  css,
  wrap,
  ...options
}) => {
  const [value, update] = useState<string>(String(options.value || ''));
  useEffect(() => change(options.value), [options.value]);
  const change = (next?: string | number) => {
    const data = String(next || '');
    update(data);
    if (options.change) {
      options.change(data, {});
    }
  };
  return createNuggie({
    type: wrap ? 'textarea' : 'input',
    children,
    css: { width: '100%', ...css },
    extras: { value, rows: wrap },
    ...options,
  });
};

In.displayName = 'In';
