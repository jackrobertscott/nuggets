import { useState } from 'react';

export interface ISchemaValue {
  [name: string]: any;
}

export interface ISchemaDirty {
  [name: string]: boolean;
}

export interface ISchemaValidate {
  [name: string]: (data: any) => Promise<any> | any;
}

export interface ISchemaError {
  [name: string]: Error;
}

export interface IuseSchemaOptions {
  initial?: ISchemaValue;
  schema: ISchemaValidate;
  change?: (value: ISchemaValue) => any;
}

export interface IuseSchemaProperties {
  value: any;
  error?: Error;
  dirty: boolean;
  advance: boolean;
  change: (data: any) => void;
  blur: (status?: boolean) => void;
}

export interface IuseSchemaProps {
  properties: {
    [name: string]: IuseSchemaProperties;
  };
  value: ISchemaValue;
  error: ISchemaError;
  dirty: ISchemaDirty;
  advance: boolean;
  valid: boolean;
  invalid: boolean;
  change: (value: ISchemaValue) => any;
  override: (value?: ISchemaValue) => void;
  blur: (override?: boolean) => void;
}

export const useSchema = ({
  initial,
  change,
  schema,
}: IuseSchemaOptions): IuseSchemaProps => {
  const [state, update] = useState<ISchemaValue>(
    initial
      ? Object.keys(schema).reduce((all, key) => {
        return initial[key] ? { ...all, [key]: initial[key] } : all;
      }, {})
      : {}
  );
  const [error, updateError] = useState<ISchemaError>({});
  const [dirty, updateDirty] = useState<ISchemaDirty>({});
  const [advance, updateGlobal] = useState<boolean>(false);
  const override = (next?: ISchemaValue) => {
    const data = next || {};
    const filter = Object.keys(schema).reduce((all, key) => {
      return data[key] ? { ...all, [key]: data[key] } : all;
    }, {});
    update(filter);
    if (change) {
      change(filter);
    }
    if (schema) {
      const tasks = Object.keys(schema).map(key => {
        try {
          const status = schema && schema[key](data[key]);
          if (status instanceof Promise) {
            return status
              .then(() => ({ [key]: undefined }))
              .catch((e: Error) => ({ [key]: e }));
          }
        } catch (e) {
          return Promise.resolve({ [key]: e });
        }
        return Promise.resolve({ [key]: undefined });
      });
      Promise.all(tasks as Array<Promise<any>>).then(values => {
        const issues = values.reduce((all, e) => {
          return { ...all, ...(e || {}) };
        }, {});
        updateError(issues);
      });
    }
  };
  const patch = (next?: ISchemaValue) => {
    override({ ...state, ...(next || {}) });
  };
  const reduce = (all: any, key: string) => ({
    ...all,
    [key]: {
      value: state[key],
      error: error[key],
      dirty: advance || dirty[key] || !!state[key],
      advance,
      change: (data: any) => {
        return patch({
          [key]: data,
        });
      },
      blur: (status?: boolean) => {
        return updateDirty({
          ...dirty,
          [key]: status || true,
        });
      },
    },
  });
  const valid = !Object.keys(error).filter(key => error[key]).length;
  return {
    properties: Object.keys(schema).reduce(reduce, {}),
    value: state,
    dirty,
    advance,
    error,
    valid,
    invalid: !valid,
    change: patch,
    override,
    blur: (status?: boolean) => updateGlobal(status || true),
  };
};
