import { useState, useEffect } from 'react';
import { FunctionHook } from '../../utils/types';

export interface IComplexValue {
  [name: string]: any;
}

export interface IuseComplexProps {
  value?: IComplexValue;
  change?: (value: IComplexValue) => any;
}

export interface IuseComplexChildren {
  value?: IComplexValue;
  change?: (value: IComplexValue) => any;
}

export const useComplex: FunctionHook<
  IuseComplexProps,
  IuseComplexChildren
> = options => {
  const [value, change] = useState<IComplexValue>(options.value || {});
  useEffect(() => patch(options.value), [options.value]);
  const update = (next?: any) => {
    const data = next || {};
    change(data);
    if (options.change) {
      options.change(data);
    }
  };
  const patch = (next?: IComplexValue) => {
    update({ ...value, ...(next || {}) });
  };
  const operate = (name: string) => ({
    value: value[name],
    change: (data: any) => patch({ [name]: data }),
  });
  return {
    value,
    change: patch,
    operate,
    override: update,
  };
};
