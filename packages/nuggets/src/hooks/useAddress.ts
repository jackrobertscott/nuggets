import { useState, useEffect } from 'react';
import * as queryString from 'query-string';
import history, { ILocation } from '../utils/history';
import { matchPath, IDigestOptions } from '../utils/path';

export interface IuseAddressOptions {}

export type IuseAddressProps = ILocation & {
  value: ILocation;
  params: queryString.ParsedQuery;
  entries: number;
  change: (address: string) => any;
  shift: (entries: number) => any;
  backward: () => any;
  forward: () => any;
  match: (options: string | ({ path: string } & IDigestOptions)) => boolean;
  parse: (search: string) => { [param: string]: unknown };
  stringify: (data: { [param: string]: unknown }) => string;
};

export const useAddress = ({
  ...options
}: IuseAddressOptions = {}): IuseAddressProps => {
  const [state, update] = useState<ILocation>({
    ...history.location,
  });
  useEffect(() => {
    return history.listen((data: ILocation) => {
      update(data);
    });
  }, []);
  const change = (address: string) => history.push(address);
  const shift = (entries: number) => history.go(entries);
  const forward = () => history.goForward();
  const backward = () => history.goForward();
  const params = state.search ? queryString.parse(state.search) : {};
  const parse = (search: string) => queryString.parse(search);
  const stringify = (data: { [param: string]: unknown }) =>
    queryString.stringify(data);
  const match = (route: string | ({ path: string } & IDigestOptions)) => {
    const path = typeof route === 'string' ? route : route.path;
    return matchPath({
      currentPath: state.pathname,
      routePath: path,
      options: typeof route === 'string' ? {} : route,
    });
  };
  return {
    ...state,
    value: state,
    params,
    entries: history.length,
    change,
    shift,
    forward,
    backward,
    match,
    parse,
    stringify,
  };
};
