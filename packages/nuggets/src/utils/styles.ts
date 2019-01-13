import { INugget } from './dom';

export interface ITransitionProps<T> {
  style?: T;
  hover?: T;
  press?: T;
  visited?: T;
}

export interface ICSSObject {
  [name: string]: string | number | ICSSObject | undefined;
}

export type IDigest<T> = (options: T) => ICSSObject;

export type IDigestArray<T> = Array<IDigest<T>>;

export const createCSSFromDigests = <T>(
  options: INugget<T, any>,
  digests: IDigestArray<T>
): ICSSObject => {
  const { style, hover, press, visited, ...others } = options;
  const stylize = (config: any) =>
    digests
      .map(rule => rule(config))
      .filter(exists => exists)
      .reduce((accum, next) => ({ ...accum, ...next }), {});
  const substylize = (access: string, data?: T): ICSSObject => {
    if (data) {
      return {
        [access]: stylize(data),
      };
    }
    return {};
  };
  return [
    stylize({ ...style, ...others }),
    substylize('&:hover', hover),
    substylize('&:active', press),
    substylize('&:visited', visited),
  ].reduce((accum, next) => ({ ...accum, ...next }), {});
};
