import React, { FunctionComponent } from 'react';
import { Linear, List, Square, Text, ITextProps } from 'nuggets';

const people: Array<{ name: string }> = [{ name: 'me' }, { name: 'you' }];

const textStyle: ITextProps = {
  color: 'yellow',
  family: 'monospace',
  align: 'right',
};

const textOverrides = {
  fontSize: '30px',
};

const PeopleList: FunctionComponent = () => (
  <Linear direction="up">
    <List items={people}>
      {({ name }, index) => (
        <Square
          key={name}
          color="green"
          press={{ color: 'blue' }}
          border={{
            color: 'blue',
            thickness: 5,
            style: 'dashed',
            sides: ['bottom', 'top'],
          }}
          shadow={{ blur: 5 }}
        >
          <Text color="yellow" style={textStyle} overrides={textOverrides}>
            {name}: {index}
          </Text>
        </Square>
      )}
    </List>
  </Linear>
);

export default PeopleList;
