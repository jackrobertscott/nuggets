import { FunctionComponent, createElement } from 'react';

export interface INuggetConfig<P> {
  component: FunctionComponent<P>;
}

export const createNugget = <P>({
  component,
}: INuggetConfig<P>): FunctionComponent<P> => {
  return ({ children, ...props }) => {
    return createElement(component, { children, ...props });
  };
};
