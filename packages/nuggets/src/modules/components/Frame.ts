import { useState, useEffect, FunctionComponent, ReactNode } from 'react';
import { IEventsExecuter } from '../../utils/types';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { createCSSFromStyles } from '../../utils/styles';

export type IFrameProps = INuggieProps & {
  children?: ReactNode;
  value?: string | number;
  change?: IEventsExecuter<string | number>;
  placeholder?: string | number;
  editable?: boolean;
  multiline?: number;
  type?: string;
};

export const Frame: FunctionComponent<IFrameProps> = ({
  node,
  events = {},
  styles = {},
  children,
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
    display: 'flex',
    position: 'relative',
    flexShrink: 1,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
  const setup = {
    precss,
    emote: createCSSFromStyles(styles),
    ...options,
  };
  if (editable) {
    if (multiline) {
      return createNuggie({
        ...setup,
        node: node || 'textarea',
        extras: { value, placeholder, rows: multiline },
        events: { change, ...events },
      });
    } else {
      return createNuggie({
        ...setup,
        node: node || 'input',
        extras: { value, placeholder, type },
        events: { change, ...events },
        precss: { ...precss, boxSizing: 'content-box' },
      });
    }
  }
  return createNuggie({
    ...setup,
    node: node || 'div',
    children: children || value,
    events,
  });
};

Frame.displayName = 'Frame';
