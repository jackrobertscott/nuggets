import { FunctionComponent, createElement } from 'react';
import { digestBackgroundColor } from '../utils/digests';
import { IDigestArray } from '../utils/styles';

interface ICircleProps {
  color?: string;
  click?: (...args: any[]) => any;
}

interface ICreateDom {
  options: ICircleProps;
  styles: IDigestArray<any>;
  events: Array<
    (
      options: ICircleProps
    ) => { [prop: string]: (...args: any[]) => any } | undefined
  >;
}

const createDOM = ({ options }: ICreateDom) => {
  return createElement('div', { ...options });
};

export const Circle: FunctionComponent<ICircleProps> = ({ ...options }) => {
  return createDOM({
    options,
    styles: [({ color }) => digestBackgroundColor({ color })],
    events: [({ click }) => ({ onClick: () => click && click() })],
  });
};

Circle.displayName = 'Circle';
