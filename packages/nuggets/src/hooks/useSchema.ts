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
  initial: ISchemaValue;
  schema: ISchemaValidate;
  change?: (value: ISchemaValue) => any;
}

export interface IuseSchemaProps {
  fields: {
    [name: string]: {
      value: any;
      error?: Error;
      dirty: boolean;
      change: (data: any) => void;
      blur: (status?: boolean) => void;
    };
  };
  value: ISchemaValue;
  error: ISchemaError;
  dirty: ISchemaDirty;
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
  const [state, update] = useState<ISchemaValue>(initial || {});
  const [error, updateError] = useState<ISchemaError>({});
  const [dirty, updateDirty] = useState<ISchemaDirty>({});
  const [globalDirty, updateGlobalDirty] = useState<boolean>(false);
  const override = (next?: ISchemaValue) => {
    const data = next || {};
    update(data);
    if (change) {
      change(data);
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
  const mutate = (next?: ISchemaValue) => {
    override({ ...state, ...(next || {}) });
  };
  const reduce = (all: any, key: string) => ({
    ...all,
    [key]: {
      value: state[key],
      error: error[key],
      dirty: globalDirty || dirty[key] || !!state[key],
      change: (data: any) => {
        return mutate({
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
  return {
    fields: Object.keys(schema).reduce(reduce, {}),
    value: state,
    dirty,
    error,
    invalid: !!Object.keys(error).filter(key => error[key]).length,
    change: mutate,
    override,
    blur: (status?: boolean) => updateGlobalDirty(status || true),
  };
};