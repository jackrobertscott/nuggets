import React, { FunctionComponent } from 'react';
import { Form } from 'nuggets';

const HelloForm: FunctionComponent = () => {
  const s = ({ event }: any) => {
    event.preventDefaudlt();
    console.log('memes');
  };
  return (
    <Form>
      <input name="name" />
      <button type="button">Submit</button>
    </Form>
  );
};

export default HelloForm;
