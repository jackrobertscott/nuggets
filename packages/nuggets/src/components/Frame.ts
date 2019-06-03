import * as deep from 'deepmerge';
import { createElement, FunctionComponent, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useElement } from '../hooks/useElement';
import { ensure } from '../utils/helpers';
import { emotion, prefix, cleanClassname } from '../utils/emotion';
import { ICSS, IRandom, IStatesProp, IDigester, IEvents } from '../utils/types';
import { IBackgroundProps, backgroundDigester } from '../groups/background';
import { IBordersProps, bordersDigester } from '../groups/borders';
import { IShadowsProps, shadowsDigester } from '../groups/shadows';
import { IAnimateProps, animateDigester } from '../groups/animate';
import { ICharactersProps, charactersDigester } from '../groups/characters';
import { ICornersProps, cornersDigester } from '../groups/corners';
import { IPlaceholderProps, placeholderDigester } from '../groups/placeholder';
import { IPositionProps, positionDigester } from '../groups/position';
import { ISettingsProps, settingsDigester } from '../groups/settings';
import { IShapeProps, shapeDigester } from '../groups/shape';
import { IStructureProps, structureDigester } from '../groups/structure';
import { ITransformProps, transformDigester } from '../groups/transform';

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
  animate?: IStatesProp<IAnimateProps>;
  background?: IStatesProp<IBackgroundProps>;
  borders?: IStatesProp<IBordersProps>;
  characters?: IStatesProp<ICharactersProps>;
  corners?: IStatesProp<ICornersProps>;
  placeholder?: IStatesProp<IPlaceholderProps>;
  position?: IStatesProp<IPositionProps>;
  settings?: IStatesProp<ISettingsProps>;
  shadows?: IStatesProp<IShadowsProps>;
  shape?: IStatesProp<IShapeProps>;
  structure?: IStatesProp<IStructureProps>;
  transform?: IStatesProp<ITransformProps>;
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
  if (compiled.characters) {
    const data = compiled.characters[0];
    if (typeof data === 'object') {
      if (typeof data.value === 'string' || typeof data.value === 'number') {
        props.value = data.value;
        props.children = data.value;
      }
      if (data.editable) {
        if (typeof data.multiline === 'number') {
          node = 'textarea';
          props.rows = data.multiline;
        } else {
          node = 'input';
          precss.boxSizing = 'content-box';
        }
      }
    }
  }
  if (compiled.placeholder) {
    const data = compiled.placeholder[0];
    if (data === 'string' || data === 'number') {
      props.placeholder = compiled.placeholder[0];
    }
    if (data === 'object') {
      if (data.value === 'string' || data.value === 'number') {
        props.placeholder = compiled.placeholder[0].value;
      }
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
  if (compiled.position) {
    const data = compiled.position[0];
    if (typeof data === 'object') {
      if (data.portal) {
        const portal = data.portal;
        const anchor =
          typeof portal === 'string'
            ? document.getElementById(portal || 'root')
            : portal;
        return createPortal(element, anchor);
      }
    }
  }
  return element;
};

Frame.displayName = 'Frame';
