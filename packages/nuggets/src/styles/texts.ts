import { ICSS, IDigester } from '../utils/types';
import { stringsAndPixels } from '../utils/helpers';

export interface ITextsDigester {
  size?: number;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  family?: string;
  height?: number;
  thickness?: number;
  italic?: boolean;
  divide?: number;
  decoration?: {
    color?: string;
    style?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
    lines:
      | 'underline'
      | 'overline'
      | 'line-through'
      | Array<'underline' | 'overline' | 'line-through'>;
  };
  placeholder?: {
    color?: string;
  };
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
  decoration,
  placeholder,
}) => {
  const css: ICSS = {};
  if (size !== undefined) {
    css.fontSize = `${size}px`;
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
    css.letterSpacing = `${divide}em`;
  }
  if (decoration !== undefined) {
    const { lines, style, color: decolor } = decoration;
    const delines = Array.isArray(lines) ? lines : [lines];
    css.textDecoration = `${[...delines, style, decolor].join(' ')}`;
  }
  if (height !== undefined) {
    css.lineHeight = stringsAndPixels(height, 'em');
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
  return css;
};
