# nuggets

> 📯 New Default Types

A collection of essential components which compose modern web experiences.

## Overview

In 1980, physicist Tim Berners-Lee proposed a new markup language called HTML. Then in 1997 and 1998 they brought out CSS2 and CSS3 respectively. Both are powerful languages. However, since their creation, our demands for more intricate functionality has increased without seeing a similar improvement of the technologies. Although there has been movement in the area of web development tooling, there leaves a lot to be desired.

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

The biggest problem with HTML and CSS is that it's given us *too much* power. You can apply the same styles to almost any element and have it produce a result.

But thats not good...

This freedom and power means that a simple button could be written hundreds of different ways with almost any combination of elements. As such, almost every time we attempt to create something, we have to think way more than we should need to. And when you have to think about your code, the code becomes inconsistent and takes a lot more time to create.

Nuggets aims to reduce the mental effort required to code so that you can put more effort into your designs, not the code.

## Install

Using [npm](https://www.npmjs.com/package/nuggets):

```shell
npm i --save nuggets react@next react-dom@next
```

Using [yarn](https://yarnpkg.com/en/):

```shell
yarn add nuggets react@next react-dom@next
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

### Toggle

This provides a simple to use toggle interface.

```jsx
const Creation = ({ value, change }) => (
  <Toggle value={value} change={change}>
    {({ on, off, active }) => active ? (
      <Text color="green" click={off}>On</Text>
    ) : (
      <Text color="red" click={on}>Off</Text>
    )}
  </Toggle>
);
```

### Insert

This is a simple interface for recording user keyboard input. Styles may be applied to the text created by this component (similar to `<Text />`).

```jsx
const Creation = ({ value, change }) => (
  <Insert
    color="green"
    rows={1}
    value={value}
    change={change}
    format={value => formatUsername(value)}
  />
);
```

### Datetime

This provides an easy to use interface for recording datetimes.

```jsx
const Creation = ({ value, change }) => (
  <Datetime value={value} change={change}>
    {({ update, datetime, ensure }) => (
      {/* update date of month */}
      <Insert
        value={datetime.date}
        format={ensure.date}
        change={value => update.date(value)}
      />
      {/* update month */}
      <Insert
        value={datetime.month}
        format={ensure.month}
        change={value => update.month(value)}
      />
      {/* update year */}
      <Insert
        value={datetime.year}
        format={ensure.year}
        change={value => update.year(value)}
      />
    )}
  </Datetime>
);
```

### Input

Use this to build information collectors or inputs. This does not collect information by itself, rather it provides an easy interface which you may use to collect data. By default, all inputs are *required* unless the `optional` property is specified.

```jsx
import { Input } from 'nuggets';

const Creation = ({ updateFirstName }) => (
  <Input
    name="user.email"
    optional={true}
    validate={validators.isEmail}
  >
    {({ value, change, issue }) => (
      <Square>
        <Square border={{ color: 'green' }}>
          <Insert
            value={value}
            change={change}
            format={value => value.toUpperCase()}
          />
        </Square>
        {issue && <Text>{issue}</Text>}
      </Square>
    )}
  </Input>
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
    <Form.Issues>
      {({ issues }) => issues.map(({ message, key }) => (
        <Text key={key}>{message}</Text>
      ))}
    </Form.Issues>
    <Form.Enter>
      {({ submit }) => (
        <Button click={submit}>Save</Button>
      )}
    </Form.Enter>
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
    {/* code */}
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