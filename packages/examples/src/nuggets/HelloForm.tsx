import React, { FunctionComponent, useState } from 'react';
import { Square, Form, Field, Text, Insert, Media, Datetime } from 'nuggets';

const TextField = ({ name }: { name: string }) => (
  <Field name={name}>
    {({ value, change }) => (
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
          {data => (
            <Form {...data}>
              <TextField name="three" />
            </Form>
          )}
        </Field>
        <Field name="date">
          {data => (
            <Square color="white">
              <Datetime {...data}>
                {({ date }) => <Insert {...date} />}
              </Datetime>
            </Square>
          )}
        </Field>
      </Form>
      <Square color="blue" space={10} click={reform} height={300}>
        <Text color="white">Meme form</Text>
      </Square>
      <Media throttle={150}>
        {({ width }: any) => (
          <Square
            color={width > 600 ? 'purple' : 'red'}
            space={10}
            corners={{ radius: Math.floor(width / 50) }}
            click={save}
          >
            <Text color="white">Save form</Text>
          </Square>
        )}
      </Media>
    </Square>
  );
};

export default HelloForm;
