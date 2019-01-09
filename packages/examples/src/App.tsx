import React, { Component } from 'react';
import { Linear, List, Square } from 'nuggets';

const people = [{ name: 'me' }, { name: 'you' }];

export default class App extends Component {
  public render() {
    return (
      <Linear
        direction="up"
        overrides={{
          alignItems: 'center',
        }}
      >
        <List items={people}>
          {({ name }: any) => (
            <Square key={name} color="green">
              {name}
            </Square>
          )}
        </List>
      </Linear>
    );
  }
}
