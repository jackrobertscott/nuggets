import { FunctionComponent, ReactNode, useState, useEffect } from 'react';
import { IFormContext, renderConsumer } from '../utils/form';

export interface IInputChildren {
  value: any;
  change: (value: any) => any;
}

export interface IInputProps {
  name: string;
  value?: any;
  change?: (value: any) => any;
  children: ({ value, change }: IInputChildren) => ReactNode;
}

export const Input: FunctionComponent<IInputProps> = ({
  name,
  children,
  ...options
}) => {
  const [value, change] = useState<any>(options.value);
  useEffect(
    () => {
      change(options.value);
    },
    [options.value]
  );
  return renderConsumer((form: IFormContext) => {
    if (form.value[name] !== value) {
      change(form.value[name]);
    }
    return children({
      value,
      /**
       * Here "data.value" is checked so that we can do "change={change}" on
       * <Insert /> comps which would normally be "change={({ value }) => change(value)}"
       */
      change: data => {
        let next = data;
        if (data.value) {
          next = data.value;
        }
        change(next);
        if (options.change) {
          options.change(next);
        }
        form.update({
          [name]: next,
        });
      },
    });
  });
};

Input.displayName = 'Input';
