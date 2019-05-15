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

export interface IFontsOptions {
  size?: IUnit;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  family?: string;
  line?: IUnit;
  italic?: boolean;
  spacing?: IUnit;
  decoration?: string | IDecorationOptions;
  placeholder?: string | IPlaceholderOptions;
  whitespace?: string;
  thickness?: number | string;
}

export interface IFontsDigester {
  fonts?: IFontsOptions;
}

export const fontsDigester: IDigester<IFontsDigester> = ({ fonts }) => {
  const css: ICSS = {};
  if (fonts !== undefined) {
    const {
      size,
      color,
      align,
      family,
      italic,
      line,
      spacing,
      decoration,
      placeholder,
      whitespace,
      thickness,
    } = fonts;
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
    if (line !== undefined) {
      css.lineHeight = formatUnits(line, 'em');
    }
    if (spacing !== undefined) {
      css.letterSpacing = formatUnits(spacing, 'em');
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
    if (placeholder !== undefined) {
      css['&::placeholder'] = {
        color:
          typeof placeholder === 'string' ? placeholder : placeholder.color,
      };
    }
    if (whitespace !== undefined) {
      css.whiteSpace = whitespace;
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
  }
  return css;
};
