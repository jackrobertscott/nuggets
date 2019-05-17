import { ReactElement } from 'react';
import { IThemeOptions } from './theme';

export interface ICSS {
  [name: string]: string | number | ICSS | undefined;
}

export type IDigester<M> = (theme: IThemeOptions) => (options: M) => ICSS;

export type IEventsExecuter<T> = (value: T, event?: any) => any;

export type ISides = 'top' | 'right' | 'bottom' | 'left';

export type IDirections = 'down' | 'right' | 'up' | 'left';

export type IDiagonals = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export type ISidesAndDiagonals = ISides | IDiagonals;

export type INonText =
  | Array<ReactElement<any>>
  | ReactElement<any>
  | number
  | boolean
  | undefined;

export type INonTextChildren = INonText | INonText[];

export type IUnit = number | string;
