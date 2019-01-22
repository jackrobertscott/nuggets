import { useState, useEffect } from 'react';
import { throttle } from '../../utils/helpers';
import { FunctionHook } from '../../utils/types';

export interface IuseMediaOptions {
  throttle?: number;
}

export interface IuseMediaProps {
  width: number;
  height: number;
}

export const useMedia: FunctionHook<
  IuseMediaOptions,
  IuseMediaProps
> = options => {
  const setter = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [sizes, update] = useState<IuseMediaProps>(setter());
  const change = throttle(options.throttle || 0, () => update(setter()));
  useEffect(() => {
    change();
    window.addEventListener('resize', change);
    return () => window.removeEventListener('resize', change);
  }, []);
  return sizes;
};
