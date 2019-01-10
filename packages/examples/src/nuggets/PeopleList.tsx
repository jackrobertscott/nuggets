import React, { FunctionComponent } from 'react';
import { Linear, List, Square, Text } from 'nuggets';

const people = [{ name: 'me' }, { name: 'you' }];

const PeopleList: FunctionComponent = () => (
  <Linear direction="up">
    <List items={people}>
      {({ name }: { name: string }) => (
        <Square key={name} color="green">
          <Text color="yellow" align="right">
            {name}
          </Text>
        </Square>
      )}
    </List>
  </Linear>
);

export default PeopleList;
