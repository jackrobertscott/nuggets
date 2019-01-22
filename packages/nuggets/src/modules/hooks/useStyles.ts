import { FunctionHook } from '../../utils/types';
import { ICSSObject } from '../../utils/styles';

export interface IuseStylesOptions {
  [name: string]: any;
}

export interface IuseStylesProps {
  css: ICSSObject;
  name: string;
}

export const useStyles: FunctionHook<
  IuseStylesOptions,
  IuseStylesProps
> = options => {
  return {
    css: {},
    name: '',
  };
};
