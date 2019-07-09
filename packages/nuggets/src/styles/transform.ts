import { ICSS, IDigester, IUnit, IOptions } from '../utils/types';
import { formatUnits } from '../utils/helpers';

export type I3D = IOptions<{
  x?: IUnit;
  y?: IUnit;
  z?: IUnit;
}>;

export type ITransform = IOptions<{
  rotate?: IUnit | I3D;
  scale?: number | I3D;
  translate?: IUnit | I3D;
}>;

export type ITransformProps = IOptions<ITransform>;

export const transformDigester: IDigester<ITransformProps> = value => {
  const css = {} as ICSS;
  if (typeof value === 'object') {
    const transforms: string[] = [];
    if (value.rotate) {
      transforms.push(createRotateTransform(value.rotate as any));
    }
    if (value.scale) {
      transforms.push(createScaleTransform(value.scale as any));
    }
    if (value.translate) {
      transforms.push(createTranslateTransform(value.translate as any));
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
      (typeof x === 'string' || typeof x === 'number') &&
        createTransform('rotateX', formatUnits(x, 'deg')),
      (typeof y === 'string' || typeof y === 'number') &&
        createTransform('rotateY', formatUnits(y, 'deg')),
      (typeof z === 'string' || typeof z === 'number') &&
        createTransform('rotateZ', formatUnits(z, 'deg')),
    ]
      .filter(exists => exists)
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
    if (typeof x === 'string' || typeof x === 'number') {
      if (typeof y === 'string' || typeof y === 'number') {
        if (typeof z === 'string' || typeof z === 'number') {
          transforms = `translate3d(${formatUnits(x || 0)}, ${formatUnits(
            y
          )}, ${formatUnits(z)})`;
        } else {
          transforms = `translate(${formatUnits(x)}, ${formatUnits(y)})`;
        }
      } else {
        transforms = `translateX(${formatUnits(x)})`;
      }
    } else if (typeof y === 'string' || typeof y === 'number') {
      transforms = `translateY(${formatUnits(y)})`;
    }
  }
  return transforms;
};
