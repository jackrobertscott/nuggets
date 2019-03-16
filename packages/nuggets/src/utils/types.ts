import { ReactElement } from 'react';

export interface ICSS {
  [name: string]: string | number | ICSS | undefined;
}

export type IDigester<M> = (options: M) => ICSS;

export type IEventsExecuter<T> = (value: T, event?: any) => any;

export type IOptional<T> = undefined | T;

export type ISides = 'top' | 'right' | 'bottom' | 'left';

export type IDirections = 'down' | 'right' | 'up' | 'left';

export type IDiagonals = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export type ISidesAndDiagonals = ISides | IDiagonals;

export type INonText = ReactElement<any> | number | boolean;

export type INonTextChildren = INonText | INonText[];

export type IUnit = number | string;
