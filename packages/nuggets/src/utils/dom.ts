import * as deep from 'deepmerge';
import { jsx, css as emotion } from '@emotion/core';
import { StyleSheet } from '@emotion/sheet';
import { IEventsOptions, createEvents } from './events';
import { IStylesOptions, createCSSFromStyles } from './styles';
import { ensure } from './helpers';
import { ICSS } from './types';
import clean from './clean';

const nuggie = 'nuggie';
const sheet = new StyleSheet({ key: 'clean', container: document.head });
sheet.insert(`.${nuggie} {${clean}}`);

export interface IRandom {
  [name: string]: any;
}

export interface INuggieProps {
  css?: ICSS;
  into?: IRandom;
}

export type INuggieOptions = INuggieProps & {
  type?: string;
  children?: any;
  css?: ICSS;
  into?: IRandom;
  styles?: IStylesOptions;
  events?: IEventsOptions;
  extras?: IRandom;
};

export const createNuggie = ({
  type = 'div',
  children,
  css = {},
  into = {},
  styles = {},
  events = {},
  extras = {},
}: INuggieOptions) => {
  const emote = createCSSFromStyles(styles);
  const attrs = createEvents(events);
  const props = {
    ...ensure(attrs),
    ...ensure(into),
    ...ensure(extras),
  };
  return jsx(type, {
    ...props,
    children,
    className: [props.className || '', nuggie].join(' ').trim(),
    css: emotion(deep.all([emote, css]) as ICSS),
  });
};
