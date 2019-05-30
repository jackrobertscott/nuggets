import { ICSS, IDigester, IUnit } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export interface IPlaceholderOptions {
  color?: string;
}

export interface IFontsOptions {}

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
      color: typeof placeholder === 'object' ? placeholder.color : placeholder,
    };
  }
  if (fonts !== undefined) {
  }
  return css;
};
