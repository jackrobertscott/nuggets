import {
  FunctionComponent,
  useState,
  createElement,
  useEffect,
  ReactNode,
} from 'react';
import { FormProvider, IFormContext, IFormValue } from '../../utils/form';

export interface IFormProps {
  value?: IFormValue;
  change?: (value: IFormValue) => any;
  children?: ReactNode;
}

export const Form: FunctionComponent<IFormProps> = ({
  children,
  ...options
}) => {
  const [value, change] = useState<IFormValue>(options.value || {});
  useEffect(() => update(options.value), [options.value]);
  const update = (next?: any) => {
    const data = next || {};
    change(data);
    if (options.change) {
      options.change(data);
    }
  };
  const context: IFormContext = {
    value,
    update: data => {
      const state = { ...value, ...data };
      change(state);
      if (options.change) {
        options.change(state);
      }
    },
  };
  return createElement(FormProvider, { value: context, children });
};

Form.displayName = 'Form';
