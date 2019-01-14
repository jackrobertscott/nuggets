import { throttle as addThrottle } from 'throttle-debounce';

export const throttle = (time: number, cb: (...args: any[]) => any) =>
  time ? addThrottle(time, cb) : cb;
