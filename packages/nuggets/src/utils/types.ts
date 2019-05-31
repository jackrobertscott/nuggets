export interface IEvents {
  [eventType: string]: IExecuter | null | undefined;
}

export type IRandom = {
  [name: string]: any;
};

export type ICSS = {
  [name: string]: string | number | ICSS | undefined;
};

export type ISides = 'top' | 'right' | 'bottom' | 'left';

export type IDirections = 'down' | 'right' | 'up' | 'left';

export type IDiagonals = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export type ISidesAndDiagonals = ISides | IDiagonals;

export type IUnit = number | string;

export type IDigester<T> = (value?: T) => ICSS;

export type IStates = { hover: boolean };

export type IStatesProp<T> = T | ((state: IStates) => T);

export type IExecuter = (value: any, event?: any) => any;

export type ISpace = {
  all?: IUnit;
  sides?: IUnit;
  verts?: IUnit;
  top?: IUnit;
  bottom?: IUnit;
  right?: IUnit;
  left?: IUnit;
};
