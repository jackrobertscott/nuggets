import { ICSS, IDigester, IUnit } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export type I3D = {
  x?: IUnit;
  y?: IUnit;
  z?: IUnit;
};

export type ITransform = {
  rotate?: IUnit | I3D;
  scale?: number | I3D;
  translate?: IUnit | I3D;
};

export type ITransformProps = ITransform;

/**
 * Need to fix the type checks in this file.
 */

export const transformDigester: IDigester<ITransformProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'object') {
    const transforms: string[] = [];
    if (typeof value === 'object') {
      transforms.push(createRotateTransform(value.rotate));
    }
    if (value.scale !== undefined) {
      transforms.push(createScaleTransform(value.scale));
    }
    if (value.translate !== undefined) {
      transforms.push(createTranslateTransform(value.translate));
    }
    if (transforms.length) {
      css.transform = transforms
        .filter(String)
        .join(' ')
        .trim();
    }
  }
  return css;
};

const createTransform = (name: string, value: any): string => {
  if (typeof value === 'number' || typeof value === 'string') {
    return `${name}(${value})`;
  }
  return '';
};

const createRotateTransform = (rotate?: IUnit | I3D): string => {
  let transforms = '';
  if (typeof rotate === 'number' || typeof rotate === 'string') {
    transforms = createTransform('rotate', formatUnits(rotate, 'deg'));
  }
  if (typeof rotate === 'object') {
    const { x, y, z } = rotate as I3D;
    transforms = [
      transforms,
      createTransform('rotateX', formatUnits(x, 'deg')),
      createTransform('rotateY', formatUnits(y, 'deg')),
      createTransform('rotateZ', formatUnits(z, 'deg')),
    ]
      .filter(String)
      .join(' ')
      .trim();
  }
  return transforms;
};

const createScaleTransform = (scale?: number | I3D): string => {
  let transforms = '';
  if (typeof scale === 'number') {
    transforms = createTransform('scale', scale);
  }
  if (typeof scale === 'object') {
    const { x, y, z } = scale as I3D;
    transforms =
      z === undefined
        ? `scale(${x || 1}, ${y || 1})`
        : `scale3d(${x || 1}, ${y || 1}, ${z || 1})`;
  }
  return transforms;
};

const createTranslateTransform = (translate?: IUnit | I3D): string => {
  let transforms = '';
  if (typeof translate === 'number' || typeof translate === 'string') {
    transforms = createTransform('translate', translate);
  }
  if (typeof translate === 'object') {
    const { x, y, z } = translate as I3D;
    if (z === undefined) {
      transforms = `translate(${formatUnits(x)}, ${formatUnits(y)})`;
    } else {
      transforms = `translate3d(${formatUnits(x)}, ${formatUnits(
        y
      )}, ${formatUnits(z)})`;
    }
  }
  return transforms;
};
