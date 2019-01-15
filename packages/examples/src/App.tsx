import React, { Component } from 'react';
import { Canvas, Square } from 'nuggets';
import Button from './nuggets/Button';

export default class App extends Component {
  public render() {
    return (
      <Canvas>
        <Square outside={50}>
          <Button />
        </Square>
      </Canvas>
    );
  }
}
