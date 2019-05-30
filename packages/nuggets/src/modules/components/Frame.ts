import * as deep from 'deepmerge';
import { createElement, FunctionComponent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ensure } from '../../utils/helpers';
import { emotion, prefix, cleanClassname } from '../../utils/emotion';
import { ICSS, IRandom } from '../../utils/types';
import { IEvents, createEvents } from '../../utils/events';
import { IBackground, backgroundDigester } from '../../groups/background';
import { IBorders, bordersDigester } from '../../groups/borders';
import { IShadows, shadowsDigester } from '../../groups/shadows';

export interface IFrameProps {
  children?: ReactNode;
  reference?: any;
  tag?: string;
  id?: string;
  classname?: string;
  events?: IEvents;
  style?: ICSS;
  attrs?: IRandom;
  clean?: boolean;
  background: IBackground;
  borders: IBorders;
  shadows: IShadows;
}

export const Frame: FunctionComponent<IFrameProps> = ({
  children,
  reference,
  tag = 'div',
  id,
  events = {},
  style = {},
  attrs = {},
  clean = true,
  background,
  borders,
  shadows,
}) => {
  const props = {
    ...ensure(createEvents(events)),
    ...ensure(attrs),
  };
  if (id) {
    props.id = id;
  }
  if (reference) {
    props.ref = reference;
  }
  const precss = {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
  const states = {};
  const compiled = [
    backgroundDigester(states)(background),
    bordersDigester(states)(borders),
    shadowsDigester(states)(shadows),
  ];
  const css = deep.all([
    precss,
    ...compiled.map(data => data.css),
    style,
  ]) as ICSS;
  const classes = [
    clean && cleanClassname,
    emotion.css(css),
    prefix && `${tag}-${prefix}`,
    props.className,
  ]
    .filter(exists => exists)
    .join(' ')
    .trim();
  return createElement(tag, {
    ...props,
    children,
    className: classes,
  });
};

Frame.displayName = 'Frame';
