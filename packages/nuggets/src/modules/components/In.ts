import { FunctionComponent, useState, useEffect } from 'react';
import { INuggieProps, createNuggie } from '../../utils/dom';
import { IEventsExecuter } from '../../utils/types';

export type IInProps = INuggieProps & {
  value?: string | number;
  change?: IEventsExecuter<string | number>;
  placeholder?: string | number;
  wrap?: number;
};

export const In: FunctionComponent<IInProps> = ({
  children,
  placeholder,
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
  const precss = {
    flexGrow: 1,
    width: '100%',
  };
  return createNuggie({
    type: wrap ? 'textarea' : 'input',
    children,
    precss,
    extras: { value, rows: wrap, placeholder },
    events: { change },
    ...options,
  });
};

In.displayName = 'In';
