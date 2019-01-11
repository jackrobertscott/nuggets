import React, { FunctionComponent } from 'react';
import { Form, Input } from 'nuggets';

const HelloForm: FunctionComponent = () => (
  <Form>
    <Input name="name" />
    <button type="button">Submit</button>
  </Form>
);

export default HelloForm;
