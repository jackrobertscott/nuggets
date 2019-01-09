import React, { Component } from 'react';
import { Layout } from 'nuggets';

export default class App extends Component {
  public render() {
    return (
      <Layout
        direction="up"
        overrides={{
          alignItems: 'center',
        }}
      >
        <span>Hello 1!</span>
        <span>Hello 2!</span>
      </Layout>
    );
  }
}
