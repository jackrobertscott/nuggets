import React, { FunctionComponent, useState } from 'react';
import { Square, Form, Field, Text, Insert, Media } from 'nuggets';

const TextField = ({ name }: { name: string }) => (
  <Field name={name}>
    {({ value, change }: any) => (
      <Square color="white">
        <Insert value={value} change={change} />
      </Square>
    )}
  </Field>
);

const HelloForm: FunctionComponent = () => {
  const [form, setForm] = useState<any>({});
  const reform = () =>
    setForm({
      one: 'memes',
      nested: {
        three: 'something',
      },
    });
  const save = () => {
    console.log('save: ', form);
  };
  return (
    <Square color="green" space={10} orbit={20}>
      <Form value={form} change={setForm}>
        <TextField name="one" />
        <Field name="nested">
          {(data: any) => (
            <Form {...data}>
              <TextField name="three" />
            </Form>
          )}
        </Field>
      </Form>
      <Media throttle={150}>
        {({ width }: any) => {
          return width > 600 ? (
            <Square
              color="blue"
              space={10}
              corners={{ radius: Math.floor(width / 50) }}
              click={reform}
              height={300}
              width={width / 2}
            >
              <Text color="white">Meme form</Text>
            </Square>
          ) : (
            <Square
              color="purple"
              space={10}
              corners={{ radius: Math.floor(width / 50) }}
              click={save}
            >
              <Text color="white">Save form</Text>
            </Square>
          );
        }}
      </Media>
    </Square>
  );
};

export default HelloForm;
