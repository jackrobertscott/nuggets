# nuggets

> 📯 New Default Types

A collection of essential components which compose modern web experiences.

## Overview

In 1980, physicist Tim Berners-Lee proposed a new markup language called HTML. Then in 1997 and 1998 they brought out CSS2 and CSS3 respectively. Both are powerful languages. However, since their creation, our demands for more intricate functionality has increased without seeing a similar improvement of the technologies. Although there has been movement in the area of web development tooling, there leaves a lot to be desired.

Until now...

```jsx
import { Square, Text, Linear } from 'nuggets';

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
    {people.map({ id, name }) => (
      <Square key={id} color="grey">
        <Text>{name}<Text>
        <Button click={selectPerson}>Start message with {name}</Button>
      </Square>
    )}
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

### `<Canvas />`

The canvas element prepares the browser window for components. It will fill the entire screen. It is also effective for building modals.

```jsx
import { Canvas } from 'nuggets';

const Example = ({
  color = 'white'
  children,
}) => (
  <Canvas color={color}>
    {children}
  </Canvas>
);
```

### `<Text />`

This component is required when rendering text on the page. This also styles the text.

```jsx
import { Text } from 'nuggets';

const Example = ({
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

### `<Square />`

This provides a box component which may be styled.

```jsx
import { Square } from 'nuggets';

const Example = ({
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

### `<Circle />`

This provides a circular component which may be styled.

```jsx
import { Circle } from 'nuggets';

const Example = ({
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

### `<Linear />`

This arranges all direct child components in a linear layout.

```jsx
import { Linear } from 'nuggets';

const Example = () => (
  <Linear direction="right">
    {/* code */}
  </Linear>
);
```

### `<Media />`

This provides easy access to the width of the browser window.

```jsx
import { Media } from 'nuggets';

const Example = () => (
  <Media>
    {({ width, height }) => (
      <Text color={width > 500 ? 'green' : 'blue'}>
        This text changes color with the size of the window.
      </Text>
    )}
  </Media>
);
```

### `<Toggle />`

This provides a simple to use toggle interface.

```jsx
import { Toggle, Text } from 'nuggets';

const Example = ({ value, change }) => (
  <Toggle value={value} change={change}>
    {({ on, off, active }) => active ? (
      <Text color="green" click={off}>On</Text>
    ) : (
      <Text color="red" click={on}>Off</Text>
    )}
  </Toggle>
);
```

There is also a simple `toggle` property which makes it a little easier.

```jsx
import { Toggle, Text } from 'nuggets';

const Example = ({ value, change }) => (
  <Toggle value={value} change={change}>
    {({ toggle, active }) => (
      <Text color={active ? 'green' : 'red'} click={toggle}>On</Text>
    )}
  </Toggle>
);
```

### `<Insert />`

This is a simple interface for recording user keyboard input. Styles may be applied to the text created by this component (similar to `<Text />`).

```jsx
import { Insert } from 'nuggets';

const Example = ({ value, change }) => (
  <Insert
    color="green"
    rows={1}
    value={value}
    change={change}
    format={value => stringToLowerCase(value)}
  />
);
```

### `<Datetime />`

This provides an easy to use interface for recording datetimes.

```jsx
import { Datetime, Insert } from 'nuggets';

const Example = ({ value, change }) => (
  <Datetime value={value} change={change}>
    {({ date, month, year, hour, minute, second, millisecond }) => (
      {/* update date of month */}
      <Insert
        value={date.value}
        format={date.format}
        change={date.change}
      />
      <Insert {...month} />
      <Insert {...year} />
      <Insert {...hour} />
      <Insert {...minute} />
      <Insert {...second} />
      <Insert {...millisecond} />
    )}
  </Datetime>
);
```

### `<Multiple />`

This is an interface for collecting an array of values.

```jsx
const Example = ({ value, change, items }) => (
  <Multiple value={value} change={change}>
    {({ add, remove, includes }) => items.map(({ id, name }) => (
      <Text key={id} click={() => includes(id) ? add(id) : remove(id)}>{name}</Text>
    ))}
  </Multiple>
);
```

There is also a simple `toggle` attribute which makes the above code a little easier.

```jsx
const Example = ({ value, change, items }) => (
  <Multiple value={value} change={change}>
    {({ toggle }) => items.map(({ id, name }) => (
      <Text key={id} click={() => toggle(id)}>{name}</Text>
    ))}
  </Multiple>
);
```

### `<Field />`

Use this to connect values to a form. This does not collect information by itself, rather it provides an easy interface which you may use to collect data. By default, all fields are *required* unless the `optional` property is specified.

```jsx
import { Field, Square, Text, Insert } from 'nuggets';

const Example = ({
  name = 'address.city',
  optional = true,
  ...props,
}) => (
  <Field
    name={name}
    optional={optional}
    validate={value => validators.isEmail(value)}
    {...props}
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
  </Field>
);
```

### `<Form />`

This creates an wrapper around multiple fields. The value of the form is an object with properties that match the names and values of the fields inside the form. These forms can be nested to create subforms.

```jsx
import { Form, Issues } from 'nuggets';
import { CustomButton, FieldText, FieldEmail, FieldPassword } from '../creations';

const Example = ({ person, savePerson }) => {
  const [updatedPerson, setPerson] = useState(person);
  function save() {
    savePerson(updatedPerson);
  }
  return (
    <Form value={updatedPerson} change={setPerson}>
      <FieldText name="name" />
      <FieldEmail name="email" />
      <FieldPassword name="password" />
      <CustomButton click={save}>Save</CustomButton>
    </Form>
  );
};
```

There is also a property called `wrapper` which will wrap all desired child fields.

```jsx
import { Square, Text } from 'nuggets';

const FieldWrap = ({ children, name }) => (
  <Square border={{ color: 'grey' }}>
    <Text size={12}>
      {createLabel(name)}
    </Text>
    {children}
  </Square>
);
```

```jsx
const Example = ({ savePerson }) => (
  <Form submit={savePerson} wrapper={FieldWrap}>
    {/* this field will be wrapped by the wrapper */}
    <TextField name="name" />
  </Form>
);
```

## Authors

- Jack Scott [@jacrobsco](https://twitter.com/jacrobsco) - I tweet about my coding projects.