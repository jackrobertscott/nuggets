import { ICSSObject, IDigester, stringsAndPixels } from '../utils/styles';

export interface ITextsDigester {
  size?: number;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  family?: string;
  height?: number;
  boldness?: number;
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
}

export const digestTexts: IDigester<ITextsDigester> = ({
  size,
  color,
  align,
  family,
  height,
  boldness,
  italic,
  divide,
  decoration,
}) => {
  const css: ICSSObject = {};
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
  if (boldness !== undefined) {
    const min = 100;
    const max = 900;
    if (boldness < min || boldness > max) {
      const message = `In "<Text boldness={number} />": number must be between ${min} and ${max} inclusive but got "${boldness}".`;
      throw new Error(message);
    }
    css.fontWeight = boldness;
  }
  return css;
};
