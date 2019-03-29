import { useState, useEffect } from 'react';
import { IOptional } from '../../utils/types';

export interface IComplexValue {
  [name: string]: any;
}

export type IuseComplexOptions = IOptional<{
  value?: IComplexValue;
  change?: (value: IComplexValue) => any;
  schema?: {
    [name: string]: {
      validate: (data: any) => Promise<any>;
    };
  };
}>;

export interface IuseComplexProps {
  value: IComplexValue;
  errors: IComplexValue;
  invalid: boolean;
  change: (value: IComplexValue) => any;
  override: (next?: any) => void;
  operate: (
    name: string
  ) => {
    value: any;
    error: any;
    change: (data: any) => void;
  };
}

export const useComplex = (
  options: IuseComplexOptions = {}
): IuseComplexProps => {
  const [value, update] = useState<IComplexValue>(options.value || {});
  const [errors, updateErrors] = useState<IComplexValue>({});
  useEffect(() => change(options.value), [options.value]);
  const override = (next?: any) => {
    const data = next || {};
    update(data);
    if (options.change) {
      options.change(data);
    }
    if (options.schema) {
      const tasks = Object.keys(options.schema).map(key => {
        return (
          options.schema &&
          options.schema[key]
            .validate(data[key])
            .then(() => ({ [key]: undefined }))
            .catch(error => ({ [key]: error }))
        );
      });
      Promise.all(tasks as Array<Promise<any>>).then(values => {
        const issues = values.reduce((all, error) => {
          return {
            ...all,
            ...(error || {}),
          };
        }, {});
        updateErrors(issues);
      });
    }
  };
  const change = (next?: IComplexValue) => {
    override({ ...value, ...(next || {}) });
  };
  const operate = (name: string) => ({
    value: value[name],
    error: errors[name],
    change: (data: any) => change({ [name]: data }),
  });
  return {
    value,
    errors,
    invalid: !!Object.keys(errors).filter(key => errors[key]).length,
    change,
    operate,
    override,
  };
};
