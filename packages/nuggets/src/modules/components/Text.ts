import { FunctionComponent, useState, useEffect } from 'react';
import { IEventsExecuter } from '../../utils/types';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { digestTexts, ITextsDigester } from '../../styles/texts';
import { createCSSFromProps } from '../../utils/styles';

export type ITextProps = INuggieProps<ITextsDigester> & {
  value?: string | number;
  change?: IEventsExecuter<string | number>;
  placeholder?: string | number;
  editable?: boolean;
  multiline?: boolean;
  type?: string;
};

export const Text: FunctionComponent<ITextProps> = ({
  styles = {},
  placeholder,
  editable = false,
  multiline = false,
  type,
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
    position: 'relative',
    resize: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
  const features = {
    precss,
    emote: createCSSFromProps(styles, digestTexts),
    ...options,
  };
  if (editable) {
    Object.assign(features, {
      type: multiline ? 'textarea' : 'input',
      extras: { value, placeholder, type },
      events: { change },
    });
  } else {
    Object.assign(features, {
      type: 'span',
      children: value,
    });
  }
  return createNuggie(features);
};

Text.displayName = 'Text';
