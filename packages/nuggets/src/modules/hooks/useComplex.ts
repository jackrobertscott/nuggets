import { useState, useEffect } from 'react';
import { FunctionHook } from '../../utils/types';

export interface IComplexValue {
  [name: string]: any;
}

export interface IuseComplexOptions {
  value?: IComplexValue;
  change?: (value: IComplexValue) => any;
}

export interface IuseComplexProps {
  value?: IComplexValue;
  change?: (value: IComplexValue) => any;
}

export const useComplex: FunctionHook<
  IuseComplexOptions,
  IuseComplexProps
> = options => {
  const [value, update] = useState<IComplexValue>(options.value || {});
  useEffect(() => change(options.value), [options.value]);
  const override = (next?: any) => {
    const data = next || {};
    update(data);
    if (options.change) {
      options.change(data);
    }
  };
  const change = (next?: IComplexValue) => {
    override({ ...value, ...(next || {}) });
  };
  const operate = (name: string) => ({
    value: value[name],
    change: (data: any) => change({ [name]: data }),
  });
  return {
    value,
    change,
    operate,
    override,
  };
};
