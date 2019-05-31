export const createListener = (
  action: string,
  element: HTMLElement | Document | Window,
  handler: (...args: any[]) => any
) => {
  if (element.addEventListener) {
    element.addEventListener(action, handler, false);
  } else if ((element as any).attachEvent) {
    (element as any).attachEvent(`on${action}`, handler);
  }
  return () => removeListener(action, element, handler);
};

export const removeListener = (
  action: string,
  element: HTMLElement | Document | Window,
  handler: (...args: any[]) => any
) => {
  if (element.addEventListener) {
    element.removeEventListener(action, handler, false);
  } else if ((element as any).detachEvent) {
    (element as any).detachEvent(`on${action}`, handler);
  }
};
