export interface IThemeOptions {
  hue?: number;
  saturation?: number;
}

export interface IHSLA {
  hue?: number;
  saturation?: number;
  lightness?: number;
  alpha?: number;
}

export type IColor = string | number | IHSLA;

export const createColor = (theme: IThemeOptions = {}) => (
  color: IColor = {}
) => {
  const defaults = {
    hue: 0,
    saturation: 0,
    lightness: 0,
    alpha: 1,
  };
  if (typeof color === 'string') {
    return color;
  }
  const { hue, saturation, lightness, alpha } =
    typeof color === 'number'
      ? { ...defaults, ...theme, lightness: color }
      : { ...defaults, ...theme, ...color };
  return `hsla(${hue}, ${saturation}, ${lightness}%, ${alpha})`;
};
