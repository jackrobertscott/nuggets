import { jsx, css as emotion } from '@emotion/core';
import { StyleSheet } from '@emotion/sheet';
import { IStylesDigesterArray, IStylesProps, createCSS } from './styles';
import { IEventsProps, IEventsDigesterArray, createEvents } from './events';
import clean from './clean';

export interface INuggieProps {
  into?: { [name: string]: any };
}

export type INuggie<S, E> = INuggieProps & IStylesProps<S> & IEventsProps<E>;

export interface INuggieConfig<S, E> {
  type?: string;
  children?: any;
  options: INuggie<S, E>;
  styles?: IStylesDigesterArray<S>;
  events?: IEventsDigesterArray<E>;
  extras?: { [name: string]: any };
}

const nuggie = 'nuggie';
const sheet = new StyleSheet({ key: 'clean', container: document.head });
sheet.insert(`.${nuggie} {${clean}}`);

export const createNuggie = <S, E>({
  type = 'div',
  children,
  options,
  styles = [],
  events = [],
  extras = {},
}: INuggieConfig<S, E>) => {
  const css = createCSS(options, styles);
  const attrs = createEvents(options, events);
  const into = options.into || {};
  const props = {
    ...attrs,
    ...into,
    ...extras,
  };
  return jsx(type, {
    ...props,
    children,
    className: [props.className || '', nuggie].join(' ').trim(),
    css: emotion(css),
  });
};
