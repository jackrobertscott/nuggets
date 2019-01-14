import { FunctionComponent, ReactNode, useState, useEffect } from 'react';
import { IFormContext, renderConsumer } from '../utils/form';

export interface IFieldChildren {
  value: any;
  change: (value: any) => any;
}

export interface IFieldProps {
  name: string;
  value?: any;
  change?: (value: any) => any;
  children: ({ value, change }: IFieldChildren) => ReactNode;
}

export const Field: FunctionComponent<IFieldProps> = ({
  name,
  children,
  ...options
}) => {
  const [value, change] = useState<any>(options.value);
  useEffect(() => update(options.value), [options.value]);
  const update = (data: any) => {
    change(data);
    if (options.change) {
      options.change(data);
    }
  };
  return renderConsumer((form: IFormContext) => {
    if (form.value[name] !== value) {
      update(form.value[name]);
    }
    return children({
      value,
      change: data => {
        update(data);
        form.update({
          [name]: data,
        });
      },
    });
  });
};

Field.displayName = 'Field';
