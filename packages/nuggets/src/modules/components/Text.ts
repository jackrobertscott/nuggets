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
  multiline?: number;
  type?: string;
};

export const Text: FunctionComponent<ITextProps> = ({
  node,
  styles = {},
  events = {},
  placeholder,
  editable = false,
  multiline,
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
    width: 'auto',
    resize: 'none',
    position: 'relative',
    flexShrink: 1,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
  const features = {
    classname: 'text',
    precss,
    emote: createCSSFromProps(styles, digestTexts),
    ...options,
  };
  if (editable) {
    if (multiline) {
      Object.assign(features, {
        node: node || 'textarea',
        extras: { value, placeholder, rows: multiline },
        events: { change, ...events },
      });
    } else {
      Object.assign(features, {
        node: node || 'input',
        extras: { value, placeholder, type },
        events: { change, ...events },
        precss: { ...precss, boxSizing: 'content-box' },
      });
    }
  } else {
    Object.assign(features, {
      node: node || 'span',
      children: value,
      events,
    });
  }
  return createNuggie(features);
};

Text.displayName = 'Text';
