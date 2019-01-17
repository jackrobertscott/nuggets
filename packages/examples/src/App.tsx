import React, { Component } from 'react';
import { Layer, Square, Linear } from 'nuggets';

export default class App extends Component {
  public render() {
    return (
      <Layer>
        <Linear direction="down" force="even">
          <Square outside={20} height={50} color="green" />
          <Square outside={20} height={50} color="blue" />
          <Square outside={20} height={50} color="yellow" />
        </Linear>
      </Layer>
    );
  }
}
