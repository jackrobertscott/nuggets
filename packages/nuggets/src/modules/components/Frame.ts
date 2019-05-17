import { useState, useEffect, FunctionComponent, ReactNode } from 'react';
import * as deep from 'deepmerge';
import { IEventsExecuter } from '../../utils/types';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { createCSSFromStyles } from '../../utils/styles';
import { IThemeOptions } from '../../utils/theme';

export type IFrameProps = INuggieProps & {
  merge?: IFrameProps;
  children?: ReactNode;
  value?: string | number;
  change?: IEventsExecuter<string | number>;
  theme?: IThemeOptions;
  placeholder?: string | number;
  editable?: boolean;
  multiline?: number;
  type?: string;
};

export const Frame: FunctionComponent<IFrameProps> = ({
  merge,
  ...options
}) => {
  const {
    node,
    events = {},
    styles = {},
    children,
    value,
    change,
    theme,
    placeholder,
    editable = false,
    multiline,
    type,
  } = merge ? (deep.all([merge, options]) as IFrameProps) : options;
  const starts: string | number = value
    ? value
    : typeof children === 'number' || typeof children === 'string'
    ? children
    : '';
  const [state, update] = useState<string>(String(starts));
  useEffect(() => mutate(starts), [starts]);
  const mutate = (next?: string | number) => {
    const data = String(next || '');
    update(data);
    if (change) {
      change(data, {});
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
    emote: createCSSFromStyles(styles, theme),
    ...options,
  };
  if (editable) {
    if (multiline) {
      return createNuggie({
        ...setup,
        node: node || 'textarea',
        extras: { value: state, placeholder, rows: multiline },
        events: { change: mutate, ...events },
      });
    } else {
      return createNuggie({
        ...setup,
        node: node || 'input',
        extras: { value: state, placeholder, type },
        events: { change: mutate, ...events },
        precss: { ...precss, boxSizing: 'content-box' },
      });
    }
  }
  return createNuggie({
    ...setup,
    node: node || 'div',
    children: state || children,
    events,
  });
};

Frame.displayName = 'Frame';
