import * as pathToRegexp from 'path-to-regexp';

export interface IDigestOptions {
  sensitive?: boolean;
  strict?: boolean;
  exact?: boolean;
  start?: boolean;
}

export interface IDigestRoutePathOptions {
  routePath: string;
  options?: IDigestOptions;
}

export const digestRoutePath = ({
  routePath,
  options = {},
}: IDigestRoutePathOptions): { keys: any[]; regexp: RegExp } => {
  const keys: any[] = [];
  const regexp: RegExp = pathToRegexp(routePath, keys, {
    ...options,
    end: !!options.exact,
  });
  return {
    keys,
    regexp,
  };
};

export interface IMatchPathOptions {
  currentPath: string;
  routePath: string;
  options?: IDigestOptions;
}

export const matchPath = ({
  currentPath,
  routePath,
  options = {},
}: IMatchPathOptions): boolean => {
  const { regexp } = digestRoutePath({ routePath, options });
  return regexp.exec(currentPath) !== null;
};
