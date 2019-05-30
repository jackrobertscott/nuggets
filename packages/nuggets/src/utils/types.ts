export interface IRandom {
  [name: string]: any;
}

export interface ICSS {
  [name: string]: string | number | ICSS | undefined;
}

export type ISides = 'top' | 'right' | 'bottom' | 'left';

export type IDirections = 'down' | 'right' | 'up' | 'left';

export type IDiagonals = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export type ISidesAndDiagonals = ISides | IDiagonals;

export type IUnit = number | string;
