import React, { FunctionComponent, useState } from 'react';
import { Square, Form, Input, Text } from 'nuggets';

const HelloForm: FunctionComponent = () => {
  const [form, setForm] = useState<any>({});
  const reform = () =>
    setForm({
      name: 'memes',
      home: 'dreams',
    });
  console.log(form);
  return (
    <Square color="green" padding={100}>
      <Form value={form} change={console.log}>
        <Input name="name" value={form.name} change={console.log}>
          {({ value, change }: any) => (
            <input
              value={value || ''}
              onChange={({ target }) => change(target.value)}
            />
          )}
        </Input>
        <Input name="home" change={console.log}>
          {({ value, change }: any) => (
            <input
              value={value || ''}
              onChange={({ target }) => change(target.value)}
            />
          )}
        </Input>
      </Form>
      <Square color="blue" padding={10} corners={{ radius: 3 }} click={reform}>
        <Text>Update form</Text>
      </Square>
    </Square>
  );
};

export default HelloForm;
