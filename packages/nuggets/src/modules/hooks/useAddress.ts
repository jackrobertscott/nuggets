import { useState, useEffect } from 'react';
import { IOptional } from '../../utils/types';
import history from '../../utils/history';

export interface IHistoryState {
  pathname: string;
  search: string;
  hash: string;
  entries: number;
}

export type IuseAddressOptions = IOptional<{}>;

export type IuseAddressProps = IHistoryState & {
  change: (address: string) => any;
  shift: (entries: number) => any;
  backward: () => any;
  forward: () => any;
};

export const useAddress = (
  options: IuseAddressOptions = {}
): IuseAddressProps => {
  const [value, update] = useState<IHistoryState>({
    pathname: history.location.pathname,
    search: history.location.search,
    hash: history.location.hash,
    entries: history.length,
  });
  useEffect(() => {
    return history.listen(({ pathname, search, hash }) => {
      update({ pathname, search, hash, entries: history.length });
    });
  }, []);
  const change = (address: string) => history.push(address);
  const shift = (entries: number) => history.go(entries);
  const forward = () => history.goForward();
  const backward = () => history.goForward();
  return {
    change,
    shift,
    forward,
    backward,
    ...value,
  };
};
