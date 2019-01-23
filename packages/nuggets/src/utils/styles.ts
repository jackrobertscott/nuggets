import * as deep from 'deepmerge';

export const stringsAndPixels = (
  value: string | number | undefined = 0,
  type: string = 'px'
): string => (typeof value === 'string' ? value : `${value}${type}`);

export interface ICSSObject {
  [name: string]: string | number | ICSSObject | undefined;
}

export type IDigester<M> = (options: M) => ICSSObject;

export type IStylesProps<S> = S & {
  style?: IStylesProps<S> | Array<IStylesProps<S>>;
  hover?: S;
  press?: S;
  known?: S;
  css?: ICSSObject;
};

export type IStylesDigester<S> = (options: S) => ICSSObject;

export type IStylesDigesterArray<S> = Array<IStylesDigester<S>>;

export const createAwesomeCSS = <S>(
  options: IStylesProps<S>,
  digests: IStylesDigesterArray<S>
): ICSSObject => {
  const digester = stylize(digests);
  return render(options, digester);
};

const render = <S>(
  data: IStylesProps<S>,
  digester: IStylesDigester<S>
): ICSSObject => {
  const { style, hover, press, known, css, ...options } = ensure(data);
  const styles: Array<IStylesProps<S>> = Array.isArray(style) ? style : [style];
  const pretty: IStylesProps<S> = deep.all(
    styles.filter(exists => exists)
  ) as IStylesProps<S>;
  const extras: ICSSObject =
    pretty && Object.keys(pretty).length ? render(pretty, digester) : {};
  const outputs = digester(options);
  if (hover) {
    outputs['&:hover'] = digester(hover);
  }
  if (press) {
    outputs['&:active'] = digester(press);
  }
  if (known) {
    outputs['&:visited'] = digester(known);
  }
  return deep.all([extras, outputs, css].map(ensure)) as ICSSObject;
};

const ensure = (data?: { [name: string]: any }) => data || ({} as any);

const stylize = <S>(digests: IStylesDigesterArray<S>): IStylesDigester<S> => (
  options: S
) => {
  return digests
    .map(rule => rule(options))
    .filter(exists => exists)
    .reduce((accum, next) => ({ ...accum, ...next }), {});
};
