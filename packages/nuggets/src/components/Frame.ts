import * as deep from 'deepmerge';
import { createElement, FunctionComponent, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useElement } from '../hooks/useElement';
import { ensure } from '../utils/helpers';
import { emotion, prefix, cleanClassname } from '../utils/emotion';
import { ICSS, IRandom, IStatesProp, IDigester, IEvents } from '../utils/types';
import { IBackground, backgroundDigester } from '../groups/background';
import { IBorders, bordersDigester } from '../groups/borders';
import { IShadows, shadowsDigester } from '../groups/shadows';
import { IAnimate, animateDigester } from '../groups/animate';
import { ICharacters, charactersDigester } from '../groups/characters';
import { ICorners, cornersDigester } from '../groups/corners';
import { IPlaceholder, placeholderDigester } from '../groups/placeholder';
import { IPosition, positionDigester } from '../groups/position';
import { ISettings, settingsDigester } from '../groups/settings';
import { IShape, shapeDigester } from '../groups/shape';
import { IStructure, structureDigester } from '../groups/structure';
import { ITransform, transformDigester } from '../groups/transform';

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
  animate?: IStatesProp<IAnimate>;
  background?: IStatesProp<IBackground>;
  borders?: IStatesProp<IBorders>;
  characters?: IStatesProp<ICharacters>;
  corners?: IStatesProp<ICorners>;
  placeholder?: IStatesProp<IPlaceholder>;
  position?: IStatesProp<IPosition>;
  settings?: IStatesProp<ISettings>;
  shadows?: IStatesProp<IShadows>;
  shape?: IStatesProp<IShape>;
  structure?: IStatesProp<IStructure>;
  transform?: IStatesProp<ITransform>;
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
  animate,
  background,
  borders,
  characters,
  corners,
  placeholder,
  position,
  settings,
  shadows,
  shape,
  structure,
  transform,
}) => {
  const fallback = useRef(undefined);
  const ref = reference || fallback;
  /**
   * Compile the properties.
   */
  const states = useElement({ element: ref.current, events });
  const uncompiled: {
    [name: string]: [any | IStatesProp<any>, IDigester<any>];
  } = {
    animate: [animate, animateDigester],
    background: [background, backgroundDigester],
    borders: [borders, bordersDigester],
    characters: [characters, charactersDigester],
    corners: [corners, cornersDigester],
    placeholder: [placeholder, placeholderDigester],
    position: [position, positionDigester],
    settings: [settings, settingsDigester],
    shadows: [shadows, shadowsDigester],
    shape: [shape, shapeDigester],
    structure: [structure, structureDigester],
    transform: [transform, transformDigester],
  };
  const compiled: { [name: string]: [any, IDigester<any>] } = Object.keys(
    uncompiled
  ).reduce((all, key) => {
    const [action, compiler] = uncompiled[key];
    const creation = typeof action === 'function' ? action(states) : action;
    if (creation) {
      return {
        ...all,
        [key]: [creation, compiler],
      };
    }
    return all;
  }, {});
  /**
   * Create the props for the element.
   */
  let node = tag || 'div';
  const props = {
    ...ensure(attrs),
  };
  const precss: ICSS = {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
  if (id) {
    props.id = id;
  }
  if (ref) {
    props.ref = ref;
  }
  if (children) {
    props.children = children;
  }
  if (typeof compiled.characters[0] === 'object') {
    const chars = compiled.characters[0];
    if (chars.value) {
      props.value = chars.value;
    }
    if (chars.editable) {
      if (typeof chars.multiline === 'number') {
        node = 'textarea';
        props.rows = chars.multiline;
      } else {
        node = 'input';
        precss.boxSizing = 'content-box';
      }
    }
  }
  if (
    typeof compiled.placeholder[0] === 'string' ||
    typeof compiled.placeholder[0] === 'number'
  ) {
    props.placeholder = compiled.placeholder[0];
  }
  if (typeof compiled.placeholder[0] === 'object') {
    if (
      typeof compiled.placeholder[0].value === 'string' ||
      typeof compiled.placeholder[0].value === 'number'
    ) {
      props.placeholder = compiled.placeholder[0].value;
    }
  }
  /**
   * Compile the styles from the properties.
   */
  const compiledStyles = Object.keys(compiled).map(key => {
    const [data, compiler] = compiled[key];
    return compiler(data);
  }) as ICSS[];
  const css = deep.all([precss, ...compiledStyles, style]) as ICSS;
  props.className = [
    clean && cleanClassname,
    emotion.css(css),
    prefix && `${tag}-${prefix}`,
    attrs && attrs.className,
  ]
    .filter(exists => exists)
    .join(' ')
    .trim();
  /**
   * Create the element and return - or connect to a portal.
   */
  const element = createElement(node, props);
  if (typeof compiled.position[0] === 'object') {
    if (compiled.position[0].portal) {
      const portal = compiled.position[0].portal;
      const anchor =
        typeof portal === 'string'
          ? document.getElementById(portal || 'root')
          : portal;
      return createPortal(element, anchor);
    }
  }
  return element;
};

Frame.displayName = 'Frame';
