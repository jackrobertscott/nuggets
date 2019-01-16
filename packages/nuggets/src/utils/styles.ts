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

export const ensure = (data: any) => data || ({} as any);

export const merge = (...args: any[]) =>
  args.reduce((accum, next) => ({ ...accum, ...ensure(next) }), {});

export const subproperties = (
  data: { [name: string]: any },
  property: string
) => {
  return Object.keys(data)
    .filter(item => data[item] && data[item][property] !== undefined)
    .reduce(
      (accum, item) => ({
        ...accum,
        [item]: data[item][property],
      }),
      {}
    );
};

export const createAwesomeCSS = <S>(
  options: IStylesProps<S>,
  digests: IStylesDigesterArray<S>
): ICSSObject => {
  const css = ensure(options.css);
  const style = ensure(options.style);
  const render = (...args: any[]) => stylize(digests)(merge(...args));
  return {
    ...render(style, options),
    '&:hover': {
      ...render(
        style.hover,
        options.hover,
        subproperties(style, 'hover'),
        subproperties(options, 'hover')
      ),
    },
    '&:active': {
      ...render(
        style.press,
        options.press,
        subproperties(style, 'press'),
        subproperties(options, 'press')
      ),
    },
    '&:visited': {
      ...render(
        style.visited,
        options.visited,
        subproperties(style, 'visited'),
        subproperties(options, 'visited')
      ),
    },
    ...css,
  };
};

const stylize = <S>(digests: IStylesDigesterArray<S>) => (config: S) => {
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
      [access]: stylize(digests)(data),
    };
  }
  return {};
};

export const createCSS = <S>(
  options: IStylesProps<S>,
  digests: IStylesDigesterArray<S>
): ICSSObject => {
  const override = options.css || ({} as any);
  const style = options.style || ({} as any);
  return [
    stylize(digests)({ ...style, ...options }),
    substylize(digests, '&:hover', {
      ...ensure(options.hover),
      ...ensure(style.hover),
    }),
    substylize(digests, '&:active', {
      ...ensure(options.press),
      ...ensure(style.press),
    }),
    substylize(digests, '&:visited', {
      ...ensure(options.visited),
      ...ensure(style.visited),
    }),
    override,
  ].reduce((accum, next) => ({ ...accum, ...next }), {});
};
