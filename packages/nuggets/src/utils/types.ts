export interface IEvents {
  [eventType: string]: IExecuter | null | undefined | boolean;
}

export type IRandom = {
  [name: string]: any;
};

export type ICSS = {
  [name: string]: string | number | ICSS | undefined;
};

export type IOptions<T> = { [P in keyof T]: T[P] | boolean };

export type ISides = 'top' | 'right' | 'bottom' | 'left';

export type IDirections = 'down' | 'right' | 'up' | 'left';

export type IDiagonals = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export type ISidesAndDiagonals = ISides | IDiagonals;

export type IUnit = number | string;

export type IDigester<T> = (value?: T) => ICSS;

export type IObserve = {
  hover: boolean;
  focus: boolean;
  active: boolean;
  first?: boolean;
  last?: boolean;
  index?: number;
};

export type IObserveProp<T> = T | ((state: IObserve) => T);

export type IExecuter = (value: any, event?: any) => any;

export type ISpace = {
  size?: IUnit;
  sides?: IUnit;
  verts?: IUnit;
  top?: IUnit;
  bottom?: IUnit;
  right?: IUnit;
  left?: IUnit;
};
