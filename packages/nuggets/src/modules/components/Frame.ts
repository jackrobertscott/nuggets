import { useState, useEffect, FunctionComponent, ReactNode } from 'react';
import { IEventsExecuter } from '../../utils/types';
import { createNuggie, INuggieProps } from '../../utils/dom';
import { digestTexts, ITextsDigester } from '../../styles/texts';
import { createCSSFromProps, IStylesOptions } from '../../utils/styles';
import { IShapeDigester, digestShape } from '../../styles/shape';

export type IFrameProps = INuggieProps & {
  children?: ReactNode;
  shape?: IStylesOptions<IShapeDigester>;
  fonts?: IStylesOptions<ITextsDigester>;
  value?: string | number;
  change?: IEventsExecuter<string | number>;
  placeholder?: string | number;
  editable?: boolean;
  multiline?: number;
  type?: string;
};

export const Frame: FunctionComponent<IFrameProps> = ({
  children,
  node,
  shape,
  fonts,
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
    display: 'flex',
    position: 'relative',
    flexShrink: 1,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
  const features = {
    precss,
    emote: {
      ...(shape ? createCSSFromProps(shape, digestShape) : {}),
      ...(fonts ? createCSSFromProps(fonts, digestTexts) : {}),
    },
    ...options,
  };
  if (editable) {
    if (multiline) {
      return createNuggie({
        ...features,
        node: node || 'textarea',
        extras: { value, placeholder, rows: multiline },
        events: { change, ...events },
      });
    } else {
      return createNuggie({
        ...features,
        node: node || 'input',
        extras: { value, placeholder, type },
        events: { change, ...events },
        precss: { ...precss, boxSizing: 'content-box' },
      });
    }
  }
  return createNuggie({
    ...features,
    node: node || 'span',
    children: children || value,
    events,
  });
};

Frame.displayName = 'Frame';
