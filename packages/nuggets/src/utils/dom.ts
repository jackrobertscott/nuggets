import { createElement } from 'react';
import * as deep from 'deepmerge';
import { IEventsOptions, createEvents } from './events';
import { ICSS } from './types';
import { IStylesOptions } from './styles';
import { ensure } from './helpers';
import { emotion, tag } from './emotion';
import { standardize } from './clean';

const cleanedClassname = `${tag}-${Math.random()
  .toString()
  .slice(-7)}`;
emotion.sheet.insert(`.${cleanedClassname} {${standardize}}`);

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
  classname?: string;
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
  classname,
  css = {},
  into = {},
  emote = {},
  events = {},
  precss = {},
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
  const classnames = [
    !unclean && cleanedClassname,
    emotion.css(styles),
    classname && `${tag}-${classname}`,
    props.className,
  ]
    .filter(exists => exists)
    .join(' ')
    .trim();
  return createElement(node, {
    ...props,
    children,
    className: classnames,
  });
};
