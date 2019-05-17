import { ICSS, IDigester, IUnit } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export interface ITransform3dOptions {
  x?: IUnit;
  y?: IUnit;
  z?: IUnit;
}

export interface ITransformDigester {
  rotate?: IUnit | ITransform3dOptions;
  scale?: number | ITransform3dOptions;
  translate?: IUnit | ITransform3dOptions;
}

export const transformDigester: IDigester<ITransformDigester> = theme => ({
  rotate,
  scale,
  translate,
}) => {
  const css: ICSS = {};
  const transforms: string[] = [];
  if (rotate !== undefined) {
    transforms.push(createRotateTransform(rotate));
  }
  if (scale !== undefined) {
    transforms.push(createScaleTransform(scale));
  }
  if (translate !== undefined) {
    transforms.push(createTranslateTransform(translate));
  }
  if (transforms.length) {
    css.transform = transforms
      .filter(exists => exists)
      .join(' ')
      .trim();
  }
  return css;
};

const createTransform = (name: string, value: any): string => {
  if (typeof value === 'number' || typeof value === 'string') {
    return `${name}(${value})`;
  }
  return '';
};

const createRotateTransform = (
  rotate?: IUnit | ITransform3dOptions
): string => {
  let transforms = '';
  if (rotate !== undefined) {
    if (typeof rotate === 'number' || typeof rotate === 'string') {
      transforms = createTransform('rotate', formatUnits(rotate, 'deg'));
    } else {
      const { x, y, z } = rotate as ITransform3dOptions;
      transforms = [
        transforms,
        createTransform('rotateX', formatUnits(x, 'deg')),
        createTransform('rotateY', formatUnits(y, 'deg')),
        createTransform('rotateZ', formatUnits(z, 'deg')),
      ]
        .filter(exists => exists)
        .join(' ')
        .trim();
    }
  }
  return transforms;
};

const createScaleTransform = (scale?: number | ITransform3dOptions): string => {
  let transforms = '';
  if (scale !== undefined) {
    if (typeof scale === 'number') {
      transforms = createTransform('scale', scale);
    } else {
      const { x, y, z } = scale as ITransform3dOptions;
      transforms =
        z === undefined
          ? `scale(${x || 1}, ${y || 1})`
          : `scale3d(${x || 1}, ${y || 1}, ${z || 1})`;
    }
  }
  return transforms;
};

const createTranslateTransform = (
  translate?: IUnit | ITransform3dOptions
): string => {
  let transforms = '';
  if (translate !== undefined) {
    if (typeof translate === 'number' || typeof translate === 'string') {
      transforms = createTransform('translate', translate);
    } else {
      const { x, y, z } = translate as ITransform3dOptions;
      if (z === undefined) {
        transforms = `translate(${formatUnits(x)}, ${formatUnits(y)})`;
      } else {
        transforms = `translate3d(${formatUnits(x)}, ${formatUnits(
          y
        )}, ${formatUnits(z)})`;
      }
    }
  }
  return transforms;
};
