import { useState, useEffect } from 'react';
import { IThemeOptions, createColor, IHSLA } from '../../utils/theme';

export type IuseThemeOptions = IThemeOptions & {};

export interface IuseThemeProps {
  color: (color?: number | IHSLA) => string;
}

export const useTheme = (theme: IuseThemeOptions = {}): IuseThemeProps => {
  const [state, update] = useState<IThemeOptions>(theme);
  useEffect(() => update(theme), [theme]);
  return {
    color: createColor(state),
  };
};
