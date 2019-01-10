import { createElement } from 'react';
import styled from 'styled-components';

export interface IStyledPiece {
  children?: any;
  digests: Array<string | false | undefined>;
}

export const createStyledPiece = ({ children, digests }: IStyledPiece) => {
  const styledPiece = styled.div`
    ${digests.filter(exists => exists).join('\n')}
  `;
  return createElement(styledPiece, { children });
};
