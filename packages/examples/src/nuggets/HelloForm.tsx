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
      two: 'dreams',
    });
  const save = () => {
    console.log('save: ', form);
  };
  return (
    <Square color="green" space={10} orbit={20}>
      <Form value={form} change={setForm}>
        <TextField name="one" />
        <TextField name="two" />
        <Field name="nested" value={{}}>
          {(data: any) => (
            <Form {...data}>
              <TextField name="three" />
              <TextField name="four" />
            </Form>
          )}
        </Field>
      </Form>
      <Media>
        {({ height, width }: any) => `width: ${width}, height: ${height}`}
      </Media>
      <Square color="blue" space={10} corners={{ radius: 3 }} click={reform}>
        <Text color="white">Meme form</Text>
      </Square>
      <Square color="purple" space={10} corners={{ radius: 3 }} click={save}>
        <Text color="white">Save form</Text>
      </Square>
    </Square>
  );
};

export default HelloForm;
