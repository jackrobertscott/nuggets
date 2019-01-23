import { ICSSObject } from '../utils/styles';

export interface IFlexDigester {
  direction?: 'right' | 'left' | 'up' | 'down';
  force?: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'even';
}

export const digestFlex = ({ direction, force }: IFlexDigester) => {
  const css: ICSSObject = {
    flexGrow: 1,
    display: 'flex',
    overflow: 'auto',
  };
  switch (direction) {
    default:
    case 'down':
      css.flexDirection = 'column';
      break;
    case 'up':
      css.flexDirection = 'column-reverse';
      break;
    case 'right':
      css.flexDirection = 'row';
      break;
    case 'left':
      css.flexDirection = 'row-reverse';
      break;
  }
  switch (force) {
    default:
    case 'stretch':
      css.justifyContent = 'stretch';
      break;
    case 'start':
      css.justifyContent = 'flex-start';
      break;
    case 'end':
      css.justifyContent = 'flex-end';
      break;
    case 'center':
      css.justifyContent = 'center';
      break;
    case 'between':
      css.justifyContent = 'space-between';
      break;
    case 'even':
      css.justifyContent = 'space-evenly';
      break;
  }
  return css;
};
