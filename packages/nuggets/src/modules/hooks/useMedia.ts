import { ReactNode, useState, useEffect } from 'react';
import { throttle } from '../../utils/helpers';
import { FunctionHook } from '../../utils/types';

export interface IuseMediaProps {
  children: ({ width, height }: IuseMediaChildren) => ReactNode;
  throttle?: number;
}

export interface IuseMediaChildren {
  width: number;
  height: number;
}

export const useMedia: FunctionHook<
  IuseMediaProps,
  IuseMediaChildren
> = options => {
  const [sizes, change] = useState<IuseMediaChildren>({
    width: 0,
    height: 0,
  });
  const update = throttle(options.throttle || 0, () => {
    change({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });
  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  });
  return sizes;
};
