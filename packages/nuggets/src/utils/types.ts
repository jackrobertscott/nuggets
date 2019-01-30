import { ReactElement } from 'react';

export interface ICSS {
  [name: string]: string | number | ICSS | undefined;
}

export type IDigester<M> = (options: M) => ICSS;

export type FunctionHook<P, R> = (...args: P[]) => R;

export type IEventsExecuter<T> = (value: T, event?: any) => any;

export type IOptional<T> = undefined | T;

export type IDirections = 'north' | 'east' | 'south' | 'west';

export type IDirectionsDiagonals =
  | 'northeast'
  | 'northwest'
  | 'southeast'
  | 'southwest';

export type IDirectionsAll = IDirections | IDirectionsDiagonals;

export type INonText = ReactElement<any> | number | boolean;

export type INonTextChildren = INonText | INonText[];
