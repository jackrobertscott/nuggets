import React, { FunctionComponent, useState } from 'react';
import { Square, Form, Input, Text, Insert } from 'nuggets';

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
    <Square color="green" space={10} orbit={20}>
      <Form value={form} change={setForm}>
        <Input name="name" value={form.name}>
          {({ value, change }: any) => (
            <Square color="white">
              <Insert value={value} change={change} />
            </Square>
          )}
        </Input>
        <Input name="home">
          {({ value, change }: any) => (
            <Square color="white">
              <Insert value={value} change={change} />
            </Square>
          )}
        </Input>
      </Form>
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
