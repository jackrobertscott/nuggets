import { throttle as addThrottle } from 'throttle-debounce';

export const throttle = (time: number, cb: (...args: any[]) => any) =>
  time ? addThrottle(time, cb) : cb;

export const ensure = (data?: { [name: string]: any }) => data || ({} as any);

export const formatUnits = (
  value: string | number | undefined = 0,
  type: string = 'px'
): string => (typeof value === 'string' ? value : `${value}${type}`);

export const capitalize = (data: string) => {
  return data.charAt(0).toUpperCase() + data.slice(1);
};
