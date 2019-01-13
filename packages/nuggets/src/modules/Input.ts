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
      change: data => {
        change(data);
        if (options.change) {
          options.change(data);
        }
        form.update({
          [name]: data,
        });
      },
    });
  });
};

Input.displayName = 'Input';
