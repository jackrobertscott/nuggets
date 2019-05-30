import { ICSS, IDigester, IUnit } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export interface IDecoration {
  color?: string;
  style?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
  lines:
    | 'underline'
    | 'overline'
    | 'line-through'
    | Array<'underline' | 'overline' | 'line-through'>;
}

export type ICharacters = {
  size?: IUnit;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  family?: string;
  line?: IUnit;
  italic?: boolean;
  spacing?: IUnit;
  decoration?: string | IDecoration;
  thickness?: number | string;
  whitespace?: string;
};

export type ICharactersProps = string | ICharacters;

export const charactersDigester: IDigester<ICharactersProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'string') {
    css.color = value;
  }
  if (typeof value === 'object') {
    if (value.size !== undefined) {
      css.fontSize = formatUnits(value.size);
    }
    if (value.color !== undefined) {
      css.color = value.color;
    }
    if (value.align !== undefined) {
      css.textAlign = value.align;
    }
    if (value.family !== undefined) {
      css.fontFamily = value.family;
    }
    if (value.italic !== undefined) {
      css.fontStyle = 'italic';
    }
    if (value.line !== undefined) {
      css.lineHeight = formatUnits(value.line, 'em');
    }
    if (value.spacing !== undefined) {
      css.letterSpacing = formatUnits(value.spacing, 'em');
    }
    if (value.decoration !== undefined) {
      if (typeof value.decoration === 'string') {
        css.textDecoration = value.decoration;
      } else {
        const { lines, style, color: decolor } = value.decoration;
        const delines = Array.isArray(lines) ? lines : [lines];
        css.textDecoration = `${[...delines, style, decolor].join(' ')}`;
      }
    }
    if (value.thickness !== undefined) {
      if (typeof value.thickness === 'number') {
        const min = 100;
        const max = 900;
        if (value.thickness < min || value.thickness > max) {
          const message = `Thickness must be between ${min} and ${max} inclusive but got "${
            value.thickness
          }".`;
          throw new Error(message);
        }
      }
      css.fontWeight = value.thickness;
    }
    if (value.whitespace !== undefined) {
      css.whiteSpace = value.whitespace;
    }
  }
  return css;
};
