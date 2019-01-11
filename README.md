# nuggets

> 📯 New Default Types

A collection of essential components which compose modern web experiences.

## Overview

In 1980, physicist Tim Berners-Lee proposed a new markup language called HTML. Then came CSS3 in 1998. Both are powerful languages. However, since their creation, modern web development has significantly progressed and we now long for more functionality from these languages. Although there has been movement in this area, there leaves a lot to be desired in terms of functionality.

Until now...

```jsx
import { Square, Text, Linear, List } from 'nuggets';

const Button = ({
  textColor = 'blue',
  clickButton,
}) => (
  <Square
    color="green"
    space={{ sides: 10, verts: 14 }}
    click={clickButton}
  >
    <Text color={textColor}>{children}</Text>
  </Square>
);

const PersonList = ({
  people = []
  selectPerson,
}) => (
  <Linear direction="down">
    <List items={people}>
      {({ id, name }) => (
        <Square key={id} color="grey">
          <Text>{name}<Text>
          <Button click={selectPerson}>Start message with {name}</Button>
        </Square>
      )}
    </List>
  </Linear>
);
```

We found that the biggest problem with HTML and CSS is that it's given all the elements *too much* power. You can use almost any element to do anything.

But thats not good...

This freedom and power means that we have a million different ways to create the same code. This means every time we attempt to create something, we have to think. And when you have to think about your code, the code becomes inconsistent and takes a lot more time to create. Nuggets aims to remove this thinking so that there is a simple a best way to make everything.

## Install

Using [npm](https://www.npmjs.com/package/nuggets):

```shell
npm i --save nuggets
```

Using [yarn](https://yarnpkg.com/en/):

```shell
yarn add nuggets
```

Then import the helper classes where needed.

```jsx
import { Canvas, Square, Linear } from 'nuggets';
```

## Components

### Canvas

The canvas element prepares the browser window for components. It will fill the entire screen. It is also effective for building modals.

```jsx
import { Canvas } from 'nuggets';

const Creation = ({
  color = 'white'
  children,
}) => (
  <Canvas color={color}>
    {children}
  </Canvas>
);
```

### Text

This component is required when rendering text on the page. This also styles the text.

```jsx
import { Text } from 'nuggets';

const Creation = ({
  color = 'black'
}) => (
  <Text
    size={14}
    color={color}
    hover={{ color: 'blue' }}
    click={() => console.log('clicked!')}
  >
    Hello nuggets!
  </Text>
);
```

### Square

This provides a box component which may be styled.

```jsx
import { Square } from 'nuggets';

const Creation = ({
  color = 'white'
  children,
}) => (
  <Square
    height={100}
    width={300}
    color={color}
    shadow={{
      color: 'black',
      blur: 10,
      down: 3,
    }}
    hover={{ color: 'yellow' }}
    press={{ color: 'blue' }}
    click={() => console.log('clicked!')}
  >
    {children}
  </Square>
);
```

### Circle

This provides a circular component which may be styled.

```jsx
import { Circle } from 'nuggets';

const Creation = ({
  color = 'white',
  children,
}) => (
  <Circle
    diameter={100}
    color={color}
    shadow={{
      color: 'black',
      blur: 10,
      down: 3,
    }}
    hover={{ color: 'yellow' }}
    press={{ color: 'blue' }}
    click={() => console.log('clicked!')}
  >
    {children}
  </Circle>
);
```

### Linear

This arranges all direct child components in a linear layout.

```jsx
import { Linear } from 'nuggets';

const Creation = () => (
  <Linear direction="right">
    {/* code */}
  </Linear>
);
```

### List

This iterates over an array of values and takes a function as the child.

```jsx
import { List, Text } from 'nuggets';

const people = [
  { id: 1, name: 'Bob' },
  { id: 2, name: 'Sally' },
];

const Creation = () => (
  <List items={people}>
    {({ id, name }) => (
      <Text key={id}>{name}</Text>
    )}
  </List>
);
```

### Media

This provides easy access to the width of the browser window.

```jsx
import { Media } from 'nuggets';

const Creation = () => (
  <Media>
    {({ width }) => (
      <Text color={width > 500 ? 'green' : 'blue'}>
        This text changes color with the size of the window.
      </Text>
    )}
  </Media>
);
```

### Input

This allows values to be manipulated by user actions. By default, all inputs are *required* unless the `optional` property is specified.

```jsx
import { Input } from 'nuggets';

const Creation = ({ updateFirstName }) => (
  <Input.Text
    name="firstName"
    optional={true}
    change={({ value }) => updateFirstName(value)}
  />
);
```

There are multiple input types. You may also use a custom input component as well.

```jsx
import { Input } from 'nuggets';

const UpperCaseInput = ({ ...props }) => (
  <Input.Text
    border={{
      thickness: 1,
      color: 'grey',
    }}
    focus={{
      border: { color: 'blue' },
    }}
    format={({ value }) => value.toUpperCase()}
    {...props}
  />
);
```

```jsx
const Creation = () => (
  <Input
    name="tag"
    custom={UpperCaseInput}
  />
);
```

### Form

This groups the values of any child inputs.

```jsx
import { Form, Input } from 'nuggets';

const Creation = ({ savePerson }) => (
  <Form submit={savePerson}>
    <Input.Text name="name" />
    <Input.Email name="email" />
    <Input.Password name="password" />
  </Form>
);
```

There is also a property called `wrapper` which will wrap all desired child inputs.

```jsx
import { Square, Text } from 'nuggets';

const InputWrap = ({ children, name }) => (
  <Square border={{ color: 'grey' }}>
    <Text size={12}>
      {createLabel(name)}
    </Text>
    {children}
  </Square>
);
```

```jsx
const Creation = ({ savePerson }) => (
  <Form submit={savePerson} wrapper={InputWrap}>
    <Input.Text name="name" />
    <Input.Email name="email" />
    <Input.Password name="password" />
  </Form>
);
```

### Route

This will render a component for a given url path. Route guards can be applied with the `guard` property - restricting access to a route.

```jsx
import { Route } from 'nuggets';

const Creation = ({ isUserAuthenticated }) => (
  <Route
    path="/profile"
    show={ProfilePage}
    exact={false}
    guard={() => isUserAuthenticated()}
  />
);
```

### Router

This takes a group of routes and ensures that only one route is rendered at a time.

```jsx
import { Router, Route } from 'nuggets';

const Creation = () => (
  <Router
    loading={Loading}
    nomatch={NoMatch}
    guard={() => isUserAuthenticated()}
    redirect="/login"
  >
    <Route
      path="/"
      exact={true}
      show={Dashboard}
    />
    <Route
      path="/profile"
      show={Profile}
    />
  </Router>
);
```

### Link

These are used to change the url of the browser window. When a link's path matches the current url path, styles in the `active` property will be applied.

```jsx
import { Link } from 'nuggets';

const Creation = ({ id, username }) => (
  <Link
    path={`/user/${id}`}
    color="black"
    active={{ color: 'blue' }}
  >
    {username}
  </Link>
);
```

## Authors

- Jack Scott [@jacrobsco](https://twitter.com/jacrobsco) - I tweet about my coding projects.