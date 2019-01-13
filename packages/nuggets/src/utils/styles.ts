export interface ICSSObject {
  [name: string]: string | number | ICSSObject | undefined;
}

export type IStylesProps<S> = S & {
  style?: S;
  hover?: S;
  press?: S;
  visited?: S;
  css?: ICSSObject;
};

export type IStylesDigester<S> = (options: S) => ICSSObject;

export type IStylesDigesterArray<S> = Array<IStylesDigester<S>>;

export const createCSS = <S>(
  options: IStylesProps<S>,
  digests: IStylesDigesterArray<S>
): ICSSObject => {
  const style = options.style || {};
  const override = options.css || {};
  return [
    stylize(digests, { ...style, ...options }),
    substylize(digests, '&:hover', options.hover),
    substylize(digests, '&:active', options.press),
    substylize(digests, '&:visited', options.visited),
    override,
  ].reduce((accum, next) => ({ ...accum, ...next }), {});
};

const stylize = <S>(digests: IStylesDigesterArray<S>, config: S) => {
  return digests
    .map(rule => rule(config))
    .filter(exists => exists)
    .reduce((accum, next) => ({ ...accum, ...next }), {});
};

const substylize = <S>(
  digests: IStylesDigesterArray<S>,
  access: string,
  data?: S
): ICSSObject => {
  if (data) {
    return {
      [access]: stylize(digests, data),
    };
  }
  return {};
};
