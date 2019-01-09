import { createElement } from 'react';
import styled from 'styled-components';

export const createStyledComponent = <T>(
  style: (data: T) => string,
  props: T
) => {
  return createElement(styled.div(style as any), props);
};
