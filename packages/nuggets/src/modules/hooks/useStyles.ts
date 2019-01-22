import { FunctionHook } from '../../utils/types';
import { ICSSObject } from '../../utils/styles';

export interface IuseStylesProps {
  [name: string]: any;
}

export interface IuseStylesChildren {
  css: ICSSObject;
  name: string;
}

export const useStyles: FunctionHook<
  IuseStylesProps,
  IuseStylesChildren
> = options => {
  return {
    css: {},
    name: '',
  };
};
