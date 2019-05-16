import { useState, useEffect } from 'react';

export interface IComplexValue {
  [name: string]: any;
}

export interface IuseComplexOptions {
  value?: IComplexValue;
  change?: (value: IComplexValue) => any;
  schema?: {
    [name: string]: {
      validate: (data: any) => Promise<any>;
    };
  };
}

export interface IuseComplexProps {
  value: IComplexValue;
  error: IComplexValue;
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

export const useComplex = ({
  value,
  change,
  schema,
}: IuseComplexOptions = {}): IuseComplexProps => {
  const [state, update] = useState<IComplexValue>(value || {});
  const [error, updateErrors] = useState<IComplexValue>({});
  useEffect(() => mutate(value), [value]);
  const override = (next?: any) => {
    const data = next || {};
    update(data);
    if (change) {
      change(data);
    }
    if (schema) {
      const tasks = Object.keys(schema).map(key => {
        return (
          schema &&
          schema[key]
            .validate(data[key])
            .then(() => ({ [key]: undefined }))
            .catch((e: Error) => ({ [key]: e }))
        );
      });
      Promise.all(tasks as Array<Promise<any>>).then(values => {
        const issues = values.reduce((all, e) => {
          return {
            ...all,
            ...(e || {}),
          };
        }, {});
        updateErrors(issues);
      });
    }
  };
  const mutate = (next?: IComplexValue) => {
    override({ ...state, ...(next || {}) });
  };
  const operate = (name: string) => ({
    value: state[name],
    error: error[name],
    change: (data: any) => mutate({ [name]: data }),
  });
  return {
    value: state,
    invalid: !!Object.keys(error).filter(key => error[key]).length,
    change: mutate,
    operate,
    override,
    error,
  };
};
