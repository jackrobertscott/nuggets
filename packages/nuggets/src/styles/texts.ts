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
  alpha?: number;
  align?: 'left' | 'center' | 'right' | 'justify';
  family?: string;
  line?: IUnit;
  italic?: boolean;
  divide?: IUnit;
  transition?: IUnit;
  decoration?: string | IDecorationOptions;
  thickness?: number | string;
  placeholder?: IPlaceholderOptions;
  cursor?: string;
  whitespace?: string;
  space?: IUnit | ISpaceOptions;
}

export const digestTexts: IDigester<ITextsDigester> = ({
  size,
  color,
  alpha,
  align,
  family,
  italic,
  line,
  thickness,
  divide,
  transition,
  decoration,
  placeholder,
  cursor,
  whitespace,
  space,
}) => {
  const css: ICSS = {};
  if (size !== undefined) {
    css.fontSize = formatUnits(size);
  }
  if (color !== undefined) {
    css.color = color;
  }
  if (alpha !== undefined) {
    if (alpha > 1 || alpha < 0) {
      const message = `The "shape.alpha" property must be between 0 and 1 inclusive, but got "${alpha}".`;
      throw new Error(message);
    }
    css.opacity = alpha;
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
  if (line !== undefined) {
    css.lineHeight = formatUnits(line, 'em');
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
    if (typeof thickness === 'number') {
      const min = 100;
      const max = 900;
      if (thickness < min || thickness > max) {
        const message = `Thickness must be between ${min} and ${max} inclusive but got "${thickness}".`;
        throw new Error(message);
      }
    }
    css.fontWeight = thickness;
  }
  if (placeholder !== undefined) {
    css['&::placeholder'] = { color: placeholder.color };
  }
  if (cursor !== undefined) {
    css.cursor = cursor;
  }
  if (whitespace !== undefined) {
    css.whiteSpace = whitespace;
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
