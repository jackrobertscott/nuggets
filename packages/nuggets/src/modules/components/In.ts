import { FunctionComponent, useState, useEffect } from 'react';
import { IEventsExecuter } from '../../utils/types';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { digestTexts, ITextsDigester } from '../../styles/texts';
import { createCSSFromProps } from '../../utils/styles';

export type IInProps = INuggieProps<ITextsDigester> & {
  value?: string | number;
  change?: IEventsExecuter<string | number>;
  placeholder?: string | number;
  scrollable?: boolean;
};

export const In: FunctionComponent<IInProps> = ({
  children,
  placeholder,
  styles = {},
  scrollable = true,
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
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: scrollable ? 'auto' : 'hidden',
    resize: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
  return createNuggie({
    type: 'textarea',
    children,
    precss,
    extras: { value, placeholder },
    events: { change },
    emote: createCSSFromProps(styles, digestTexts),
    ...options,
  });
};

In.displayName = 'In';
