import { useState, useEffect } from 'react';
import { IOptional } from '../../utils/types';

export interface IComplexValue {
  [name: string]: any;
}

export type IuseComplexOptions = IOptional<{
  value?: IComplexValue;
  change?: (value: IComplexValue) => any;
}>;

export interface IuseComplexProps {
  value?: IComplexValue;
  change: (value: IComplexValue) => any;
  operate: (
    name: string
  ) => {
    value: any;
    change: (data: any) => void;
  };
  override: (next?: any) => void;
}

export const useComplex = (
  options: IuseComplexOptions = {}
): IuseComplexProps => {
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
