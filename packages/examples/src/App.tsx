import React, { Component } from 'react';
import PeopleList from './nuggets/PeopleList';
import HelloForm from './nuggets/HelloForm';
import { Canvas } from 'nuggets';

export default class App extends Component {
  public render() {
    return (
      <Canvas>
        <PeopleList />
        <HelloForm />
      </Canvas>
    );
  }
}
