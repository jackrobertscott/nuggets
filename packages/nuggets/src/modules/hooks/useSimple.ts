import { FunctionComponent, ReactNode, useState, useEffect } from 'react';
import { IFormContext, renderConsumer } from '../../utils/form';

export interface IFieldChildren {
  value: any;
  change: (value: any) => any;
  issues?: any;
}

export interface IFieldProps {
  name: string;
  value?: any;
  change?: (value: any) => any;
  validate?: (value: any) => any;
  children: ({ value, change }: IFieldChildren) => ReactNode;
}

export const Field: FunctionComponent<IFieldProps> = ({
  name,
  validate,
  children,
  ...options
}) => {
  const [value, change] = useState<any>(options.value);
  const [issues, setIssues] = useState<any>({});
  useEffect(() => update(options.value), [options.value]);
  const update = (data: any) => {
    change(data);
    if (options.change) {
      options.change(data);
    }
    if (validate) {
      setIssues(validate(data));
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
      issues,
    });
  });
};

Field.displayName = 'Field';
