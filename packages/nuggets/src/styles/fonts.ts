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
  thickness?: number | string;
  whitespace?: string;
}

/**
 * The reason why storing font styles in a single object
 * can be bad is because of how we spread the properties
 * when combining them with new ones e.g.
 *
 * styles={{ fonts: {}, ...styles }}
 *
 * in this circumstance, the fonts can be easily overridden...
 */
export interface IFontsDigester {
  fonts?: string | IFontsOptions;
  placeholder?: string | IPlaceholderOptions;
}

export const fontsDigester: IDigester<IFontsDigester> = ({
  fonts,
  placeholder,
}) => {
  const css: ICSS = {};
  if (placeholder !== undefined) {
    css['&::placeholder'] = {
      color: typeof placeholder === 'string' ? placeholder : placeholder.color,
    };
  }
  if (fonts !== undefined) {
    if (typeof fonts === 'string') {
      css.color = fonts;
    } else {
      const {
        size,
        color,
        align,
        family,
        italic,
        line,
        spacing,
        decoration,
        thickness,
        whitespace,
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
      if (whitespace !== undefined) {
        css.whiteSpace = whitespace;
      }
    }
  }
  return css;
};
