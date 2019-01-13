import { jsx, css as emotion } from '@emotion/core';
import { IStylesDigesterArray, IStylesProps, createCSS } from './styles';
import { IEventsProps, IEventsDigesterArray, createEvents } from './events';

export interface INuggieProps {
  into?: { [name: string]: any };
}

export type INuggie<S, E> = INuggieProps & IStylesProps<S> & IEventsProps<E>;

export interface INuggieConfig<S, E> {
  type?: string;
  children?: any;
  extras?: { [name: string]: any };
  options: INuggie<S, E>;
  styles: IStylesDigesterArray<S>;
  events: IEventsDigesterArray<E>;
}

export const createNuggie = <S, E>({
  type = 'div',
  children,
  options,
  styles,
  events,
  extras,
}: INuggieConfig<S, E>) => {
  const css = createCSS(options, styles);
  const attrs = createEvents(options, events);
  const into = options.into || {};
  return jsx(type, {
    children,
    css: emotion(css),
    ...attrs,
    ...into,
    ...((extras as any) || {}),
  });
};
