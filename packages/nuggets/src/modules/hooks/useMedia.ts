import { useState, useEffect } from 'react';
import { throttle as pause } from '../../utils/helpers';

export interface IuseMediaOptions {
  throttle?: number;
}

export interface ISizes {
  width: number;
  height: number;
}

export type IuseMediaProps = ISizes & {
  value: ISizes;
};

export const useMedia = ({
  throttle,
}: IuseMediaOptions = {}): IuseMediaProps => {
  const setter = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [state, update] = useState<ISizes>(setter());
  const change = pause(throttle || 0, () => update(setter()));
  useEffect(() => {
    change();
    window.addEventListener('resize', change);
    return () => window.removeEventListener('resize', change);
  }, []);
  return {
    ...state,
    value: state,
  };
};
