import { createContext, createElement, ReactNode } from 'react';

export interface IFormValue {
  [name: string]: any;
}

export interface IFormContext {
  value: IFormValue;
  update: (data: IFormValue) => any;
}

const { Provider, Consumer } = createContext<IFormContext>({
  value: {},
  update: () => ({}),
});

export const FormProvider = Provider;

export const FormConsumer = Consumer;

export const renderConsumer = (
  children: (context: IFormContext) => ReactNode
) => {
  return createElement(FormConsumer, { children });
};
