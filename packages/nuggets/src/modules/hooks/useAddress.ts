import { useState, useEffect } from 'react';
import { FunctionHook } from '../../utils/types';
import history from '../../utils/history';

export interface IuseAddressProps {}

export interface IHistoryState {
  pathname: string;
  search: string;
  hash: string;
  entries: number;
}

export type IuseAddressChildren = IHistoryState & {
  change: (address: string) => any;
  shift: (entries: number) => any;
  backward: () => any;
  forward: () => any;
};

export const useAddress: FunctionHook<
  IuseAddressProps,
  IuseAddressChildren
> = options => {
  const [value, change] = useState<IHistoryState>({
    pathname: history.location.pathname,
    search: history.location.search,
    hash: history.location.hash,
    entries: history.length,
  });
  useEffect(() => {
    return history.listen(({ pathname, search, hash }) => {
      change({ pathname, search, hash, entries: history.length });
    });
  }, []);
  const move = (address: string) => history.push(address);
  const shift = (entries: number) => history.go(entries);
  const forward = () => history.goForward();
  const backward = () => history.goForward();
  return {
    change: move,
    shift,
    forward,
    backward,
    ...value,
  };
};
