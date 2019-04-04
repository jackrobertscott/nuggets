import * as deep from 'deepmerge';
import { jsx, css as emotion } from '@emotion/core';
import { StyleSheet } from '@emotion/sheet';
import { IEventsOptions, createEvents } from './events';
import { ICSS } from './types';
import { IStylesOptions } from './styles';
import { ensure } from './helpers';
import clean from './clean';

const nuggie = 'css-nuggets';
const sheet = new StyleSheet({ key: 'clean', container: document.head });
sheet.insert(`.${nuggie} {${clean}}`);

export interface IRandom {
  [name: string]: any;
}

export interface INuggieProps<S> {
  node?: string;
  id?: string;
  css?: ICSS;
  into?: IRandom;
  events?: IEventsOptions;
  styles?: IStylesOptions<S>;
  unclean?: boolean;
  reference?: any;
}

export interface INuggieOptions {
  node?: string;
  id?: string;
  css?: ICSS;
  into?: IRandom;
  events?: IEventsOptions;
  precss?: ICSS;
  emote?: ICSS;
  extras?: IRandom;
  unclean?: boolean;
  reference?: any;
  children?: unknown;
}

export const createNuggie = ({
  node = 'div',
  id,
  precss = {},
  css = {},
  into = {},
  emote = {},
  events = {},
  extras = {},
  unclean = false,
  reference,
  children,
}: INuggieOptions) => {
  const attrs = createEvents(events);
  const props = {
    ...ensure(attrs),
    ...ensure(into),
    ...ensure(extras),
  };
  if (id) {
    props.id = id;
  }
  if (reference) {
    props.ref = reference;
  }
  const styles = deep.all([precss, emote, css]) as ICSS;
  return jsx(node, {
    ...props,
    children,
    className: [unclean ? '' : nuggie, props.className || ''].join(' ').trim(),
    css: emotion(styles),
  });
};
