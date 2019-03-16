import { useState, useEffect } from 'react';
import { throttle } from '../../utils/helpers';
import { IOptional } from '../../utils/types';

export type IuseMediaOptions = IOptional<{
  throttle?: number;
}>;

export interface IuseMediaProps {
  width: number;
  height: number;
}

export const useMedia = (options: IuseMediaOptions = {}): IuseMediaProps => {
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
