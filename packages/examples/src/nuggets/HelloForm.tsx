import React, { FunctionComponent, useState } from 'react';
import { Square, Form, Input, Text } from 'nuggets';

const HelloForm: FunctionComponent = () => {
  const [form, setForm] = useState<any>({});
  const reform = () =>
    setForm({
      name: 'memes',
      home: 'dreams',
    });
  const save = () => {
    console.log('save: ', form);
  };
  return (
    <Square color="green" padding={100}>
      <Form value={form} change={setForm}>
        <Input name="name" value={form.name}>
          {({ value, change }: any) => (
            <input
              value={value || ''}
              onChange={({ target }) => change(target.value)}
            />
          )}
        </Input>
        <Input name="home">
          {({ value, change }: any) => (
            <input
              value={value || ''}
              onChange={({ target }) => change(target.value)}
            />
          )}
        </Input>
      </Form>
      <Square color="blue" padding={10} corners={{ radius: 3 }} click={reform}>
        <Text color="white">Meme form</Text>
      </Square>
      <Square color="purple" padding={10} corners={{ radius: 3 }} click={save}>
        <Text color="white">Save form</Text>
      </Square>
    </Square>
  );
};

export default HelloForm;
