import { ICSS } from './types';

export interface IDigester<T> {
  css: (value?: T) => ICSS;
}

export type IcreateDigester = <T>(
  { css }: IDigester<T>
) => (states: any) => (value?: T | ((states: any) => T)) => { css: ICSS };

export const createDigester: IcreateDigester = ({ css }) => states => value => {
  const compile = typeof value === 'function' ? (value as any)(states) : value;
  return {
    css: css(compile),
  };
};
