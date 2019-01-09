import React, { Component } from 'react';
import { Layout, List } from 'nuggets';

const people = [{ name: 'me' }, { name: 'you' }];

export default class App extends Component {
  public render() {
    return (
      <Layout
        direction="up"
        overrides={{
          alignItems: 'center',
        }}
      >
        <List items={people}>{({ name }: any) => <span>{name}</span>}</List>
      </Layout>
    );
  }
}
