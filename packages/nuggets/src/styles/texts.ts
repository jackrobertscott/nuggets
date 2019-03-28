import { ICSS, IDigester } from '../utils/types';
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

export interface ITextsDigester {
  size?: number | string;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  family?: string;
  height?: number | string;
  italic?: boolean;
  divide?: number | string;
  transition?: number | string;
  decoration?: string | IDecorationOptions;
  thickness?: number;
  placeholder?: IPlaceholderOptions;
  cursor?: string;
}

export const digestTexts: IDigester<ITextsDigester> = ({
  size,
  color,
  align,
  family,
  height,
  thickness,
  italic,
  divide,
  transition,
  decoration,
  placeholder,
  cursor,
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
  if (height !== undefined) {
    css.lineHeight = formatUnits(height, 'em');
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
  return css;
};
