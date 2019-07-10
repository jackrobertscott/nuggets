import * as deep from 'deepmerge';
import {
  createElement,
  FunctionComponent,
  ReactNode,
  useRef,
  useState,
  useEffect,
  MutableRefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { emotion, prefix, cleanClassname } from '../utils/emotion';
import { ICSS, IRandom, IEvents } from '../utils/types';
import { useObserve, IObserve } from '../hooks/useObserve';
import { IStyles, stylesDigester } from '../utils/styles';
import { eventsDigester } from '../utils/events';

export type IObserver<T> = T | ((state: IObserve) => T);

export interface INodeProps {
  children?: ReactNode;
  reference?: MutableRefObject<any>;
  portal?: string | HTMLElement | null;
  value?: string | number;
  placeholder?: string | number;
  editable?: boolean;
  multiline?: number;
  tag?: string;
  id?: string;
  classname?: string;
  events?: IObserver<IEvents>;
  styles?: IObserver<IStyles>;
  data?: IRandom;
  aria?: IRandom;
  css?: ICSS;
  attrs?: IRandom;
  clean?: boolean;
}

export const Node: FunctionComponent<INodeProps> = ({
  children,
  reference,
  portal,
  value,
  placeholder,
  editable = false,
  multiline,
  tag = 'div',
  id,
  classname,
  events = {},
  styles = {},
  css = {},
  data = {},
  aria = {},
  attrs = {},
  clean = true,
}) => {
  const fallback = useRef();
  const compiledReference: MutableRefObject<any> = reference || fallback;
  const [state, changeState] = useState(value);
  useEffect(() => changeState(value), [value]);
  /**
   * Compile the properties.
   */
  const observations = useObserve({ reference: compiledReference });
  const compiledEvents =
    typeof events === 'function' ? events(observations) : events;
  const compiledStyles =
    typeof styles === 'function' ? styles(observations) : styles;
  const digestedEvents: any = eventsDigester(compiledEvents);
  const digestedStyles: any = stylesDigester(compiledStyles);
  const digestedData = Object.keys(data).reduce((all, next) => {
    return { ...all, [`data-${next}`]: data[next] };
  }, {});
  const digestedAria = Object.keys(aria).reduce((all, next) => {
    return { ...all, [`aria-${next}`]: aria[next] };
  }, {});
  let node = tag || 'div';
  const precss: ICSS = {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
  const props: any = {
    ref: compiledReference,
    ...digestedEvents,
    ...digestedData,
    ...digestedAria,
    ...attrs,
  };
  if (typeof id === 'string') {
    props.id = id;
  }
  if (typeof editable === 'boolean' && editable) {
    if (typeof multiline === 'number') {
      node = 'textarea';
      props.rows = multiline;
      props.children = undefined;
    } else {
      node = 'input';
      precss.boxSizing = 'content-box';
      props.children = undefined;
    }
  } else {
    props.children = state || children;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    props.value = value;
    props.onChange = digestedEvents.onChange || (() => {}); // intended to be overridden
  }
  if (typeof placeholder === 'string') {
    props.placeholder = placeholder;
  }
  const deepCss = deep.all([precss, digestedStyles, css]) as ICSS;
  props.className = [
    clean && cleanClassname,
    emotion.css(deepCss),
    prefix && `${tag}-${prefix}`,
    classname,
    attrs && attrs.className,
  ]
    .filter(exists => exists)
    .join(' ')
    .trim();
  /**
   * Create the element then return it as an element or
   * connect it to a portal.
   */
  const element = createElement(node, props);
  if (portal) {
    const anchor =
      typeof portal === 'string'
        ? document.getElementById(portal || 'root')
        : portal;
    if (anchor) {
      return createPortal(element, anchor);
    }
  }
  return element;
};

Node.displayName = 'Node';
