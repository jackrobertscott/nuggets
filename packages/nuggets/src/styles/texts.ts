import { ICSS, IDigester, IUnit } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export interface IDecorationOptions {
  color?: string;
  style?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
  lines:
    | 'underline'
    | 'overline'
    | 'line-through'
    | Array<'underline' | 'overline' | 'line-through'>;
}

export interface IPlaceholderOptions {
  color?: string;
}

export interface ISpaceOptions {
  sides?: IUnit;
  verts?: IUnit;
  top?: IUnit;
  bottom?: IUnit;
  right?: IUnit;
  left?: IUnit;
}

export interface ITextsDigester {
  size?: IUnit;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  family?: string;
  height?: IUnit;
  italic?: boolean;
  divide?: IUnit;
  transition?: IUnit;
  decoration?: string | IDecorationOptions;
  thickness?: number;
  placeholder?: IPlaceholderOptions;
  cursor?: string;
  space?: IUnit | ISpaceOptions;
}

export const digestTexts: IDigester<ITextsDigester> = ({
  size,
  color,
  align,
  family,
  italic,
  height,
  thickness,
  divide,
  transition,
  decoration,
  placeholder,
  cursor,
  space,
}) => {
  const css: ICSS = {};
  if (size !== undefined) {
    css.fontSize = formatUnits(size);
  }
  if (color !== undefined) {
    css.color = color;
  }
  if (align !== undefined) {
    css.textAlign = align;
  }
  if (family !== undefined) {
    css.fontFamily = family;
  }
  if (italic !== undefined) {
    css.fontStyle = 'italic';
  }
  if (height !== undefined) {
    css.lineHeight = formatUnits(height, 'em');
  }
  if (divide !== undefined) {
    css.letterSpacing = formatUnits(divide, 'em');
  }
  if (transition !== undefined) {
    css.transition = formatUnits(transition, 'ms');
  }
  if (decoration !== undefined) {
    if (typeof decoration === 'string') {
      css.textDecoration = decoration;
    } else {
      const { lines, style, color: decolor } = decoration;
      const delines = Array.isArray(lines) ? lines : [lines];
      css.textDecoration = `${[...delines, style, decolor].join(' ')}`;
    }
  }
  if (thickness !== undefined) {
    const min = 100;
    const max = 900;
    if (thickness < min || thickness > max) {
      const message = `In "<Text thickness={number} />": number must be between ${min} and ${max} inclusive but got "${thickness}".`;
      throw new Error(message);
    }
    css.fontWeight = thickness;
  }
  if (placeholder !== undefined) {
    css['&::placeholder'] = { color: placeholder.color };
  }
  if (cursor !== undefined) {
    css.cursor = cursor;
  }
  if (space !== undefined) {
    if (typeof space === 'number' || typeof space === 'string') {
      css.padding = formatUnits(space);
    } else {
      const { top, right, bottom, left, sides, verts } = space;
      if (verts !== undefined) {
        css.paddingTop = formatUnits(verts);
        css.paddingBottom = formatUnits(verts);
      }
      if (sides !== undefined) {
        css.paddingRight = formatUnits(sides);
        css.paddingLeft = formatUnits(sides);
      }
      if (top !== undefined) {
        css.paddingTop = formatUnits(top);
      }
      if (right !== undefined) {
        css.paddingRight = formatUnits(right);
      }
      if (bottom !== undefined) {
        css.paddingBottom = formatUnits(bottom);
      }
      if (left !== undefined) {
        css.paddingLeft = formatUnits(left);
      }
    }
  }
  return css;
};
