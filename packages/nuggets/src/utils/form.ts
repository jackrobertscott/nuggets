import { createContext } from 'react';

export interface IFormContext {
  data: {
    [name: string]: any;
  };
  change: ({ name, value }: { name: string; value: any }) => any;
}

const { Provider, Consumer } = createContext<IFormContext>({
  data: {},
  change: () => ({}),
});

export const FormProvider = Provider;

export const FormConsumer = Consumer;
