import * as deep from 'deepmerge';
import { jsx, css as emotion } from '@emotion/core';
import { StyleSheet } from '@emotion/sheet';
import { IEventsOptions, createEvents } from './events';
import { ensure } from './helpers';
import { ICSS } from './types';
import clean from './clean';

const nuggie = 'nuggie';
const sheet = new StyleSheet({ key: 'clean', container: document.head });
sheet.insert(`.${nuggie} {${clean}}`);

export interface IRandom {
  [name: string]: any;
}

export interface INuggieProps<S> {
  css?: ICSS;
  into?: IRandom;
  events?: IEventsOptions;
  styles?: S;
}

export interface INuggieOptions {
  css?: ICSS;
  into?: IRandom;
  events?: IEventsOptions;
  precss?: ICSS;
  type?: string;
  emote?: ICSS;
  children?: unknown;
  extras?: IRandom;
}

export const createNuggie = ({
  type = 'div',
  children,
  precss = {},
  css = {},
  into = {},
  emote = {},
  events = {},
  extras = {},
}: INuggieOptions) => {
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
    css: emotion(deep.all([precss, emote, css]) as ICSS),
  });
};
