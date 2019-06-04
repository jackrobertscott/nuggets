import { ICSS, IDigester, IUnit } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export interface IDecoration {
  color?: string;
  style?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy' | string;
  lines:
    | 'underline'
    | 'overline'
    | 'line-through'
    | string
    | Array<'underline' | 'overline' | 'line-through' | string>;
}

export type ICharacters = {
  value?: string | number;
  editable?: boolean;
  multiline?: number;
  size?: IUnit;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify' | string;
  family?: string;
  line?: IUnit;
  italic?: boolean;
  spacing?: IUnit;
  decoration?: string | IDecoration;
  thickness?: number | string;
  whitespace?: string;
};

export type ICharactersProps = string | number | ICharacters;

export const charactersDigester: IDigester<ICharactersProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'string') {
    css.color = value;
  }
  if (typeof value === 'number') {
    css.fontSize = formatUnits(value);
  }
  if (typeof value === 'object') {
    if (typeof value.size === 'string' || typeof value.size === 'number') {
      css.fontSize = formatUnits(value.size);
    }
    if (typeof value.color === 'string') {
      css.color = value.color;
    }
    if (typeof value.align === 'string') {
      css.textAlign = value.align;
    }
    if (value.family !== undefined) {
      css.fontFamily = value.family;
    }
    if (value.italic !== undefined) {
      css.fontStyle = 'italic';
    }
    if (typeof value.line === 'string' || typeof value.line === 'number') {
      css.lineHeight = formatUnits(value.line, 'em');
    }
    if (
      typeof value.spacing === 'string' ||
      typeof value.spacing === 'number'
    ) {
      css.letterSpacing = formatUnits(value.spacing, 'em');
    }
    if (typeof value.decoration === 'string') {
      css.textDecoration = value.decoration;
    }
    if (typeof value.decoration === 'object') {
      const { lines, style, color: decolor } = value.decoration;
      const delines = Array.isArray(lines) ? lines : [lines];
      css.textDecoration = `${[...delines, style, decolor].join(' ')}`;
    }
    if (typeof value.thickness === 'number') {
      const min = 100;
      const max = 900;
      if (value.thickness < min || value.thickness > max) {
        const message = `Thickness must be between ${min} and ${max} inclusive but got "${
          value.thickness
        }".`;
        throw new Error(message);
      }
      css.fontWeight = value.thickness;
    }
    if (typeof value.thickness === 'string') {
      css.fontWeight = value.thickness;
    }
    if (typeof value.whitespace === 'string') {
      css.whiteSpace = value.whitespace;
    }
  }
  return css;
};
