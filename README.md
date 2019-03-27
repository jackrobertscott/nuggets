# nuggets

> 📯 New default types.

A collection of essential components which compose modern web experiences.

## Overview

Nuggets is designed to be minimal so you can focus on your design rather than deciding which element tag should be used. It also takes all the advantages that JavaScript has to offer so that you can build more intricate styles.

```tsx
import { Frame, Text, useMedia } from 'nuggets';

export default ({
  contents = 'Hello world!',
  mainColor = 'blue',
  clickButton = () => console.log('clicked!'),
}) => {
  const { width } = useMedia();
  return (
    <Frame>
      <Frame
        events={{ click: clickButton }}
        styles={{
          color: width > 500 ? 'green' : 'lime',
          border: {
            color: mainColor,
            hover: { color: 'red' },
          }
        }}
      >
        <Text
          value={contents}
          styles={{ color: 'black' }}
        />
      </Frame>
      <Frame
        styles={{
          color: 'blue',
          diameter: 100,
        }}
      />
    </Frame>
  );
};
```

Think less, build more.

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

```tsx
import { Layer, Frame, useMedia, useAddress } from 'nuggets';
```

## Components

### `<Layer />`

The layer element prepares the browser window for a new level components. It covers the entire screen and is perfect for using with modals. The `<Layer />` component is similar to a "layer" used in design tools.

```tsx
import { Layer } from 'nuggets';
import { Modal } from './mycomponents';

export default () => (
  <Layer attach={document.getElementById('root')}>
    <Modal message="Hello nuggets!" />
  </Layer>
);
```

#### Properties

This component needs to attach to an element in the DOM. This is similar to how you would attach your React app to an element such as `<div id="root"></div>`. You can attach the layer to a DOM element with either a node or an id:

- `node?`: a HTML element i.e. `document.getElementById('root')`.
- `id?`: a string which contains the id of the an element i.e. `root`.

### `<Frame />`

This provides a component which is used to create shapes.

```tsx
import { Frame } from 'nuggets';

export default ({ children, color = 'white' }) => (
  <Frame
    events={{
      click: () => console.log('clicked!'),
    }}
    styles={{
      color,
      height: 100,
      width: 300,
      direction: 'down',
      space: 30,
      borders: {
        color: 'yellow',
        sides: ['right'],
      },
      shade: {
        color: 'black',
        blur: 10,
        down: 3,
      },
      rotate: {
        x: 30,
        y: 90,
      }
    }}
  >
    {children}
  </Frame>
);
```

#### Properties

- `events?`: this property should contain all HTML element events.

The event names do not require the word "on" to prepend them i.e. "onClick" should be written as "click" and "onMouseLeave" becomes "mouseLeave".

**Note:** the event callback will receive the value of the event as the first parameter and the event as the second parameter i.e. `click(value, event) {}`.

- `styles?`: this is used to style the element.

Nuggets styles do not match up directly to CSS. Instead, we use the power of JavaScript object to make it a little easier to write complicated styles.

**Note:** Another thing you will notice is that "margin" is not a property; this is because margins are an anti-pattern and prevent the reuse of components. Instead, all spacing is determined by an elements parent which is far more composable.

```ts
color?: string;
alpha?: number;
gradient?: IGradientOptions;
shade?: IShadeOptions;
corners?: IUnit | ICornersOptions;
borders?: IBordersOptions;
direction?: IDirections;
force?: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'even';
align?: 'start' | 'end' | 'center' | 'stretch';
space?: IUnit | ISpaceOptions;
absolute?: IUnit | ISpaceOptions;
zindex?: number;
between?: IUnit;
circle?: boolean;
size?: IUnit;
width?: IUnit | ISizeOptions;
height?: IUnit | ISizeOptions;
grow?: boolean;
collapse?: boolean;
transition?: IUnit;
cursor?: string;
overflow?: string;
rotate?: IUnit | ITransform3dOptions;
scale?: number | ITransform3dOptions;
translate?: IUnit | ITransform3dOptions;
```

### `<Text />`

This component is used to render and record text.

```tsx
import { Out } from 'nuggets';

export default ({ color = 'black', change }) => (
  <Text
    value={'Hello nuggets!'}
    editable={true}
    change={change}
  />
);
```

#### Properties

This element shares the same convention for events and styles as the `<Frame />` component with some differences in the styles which are available.

- `events?`: this property should contain all HTML element events.
- `styles?`: this is used to style the element.

```ts
size?: number | string;
color?: string;
align?: 'left' | 'center' | 'right' | 'justify';
family?: string;
height?: number | string;
italic?: boolean;
divide?: number | string;
transition?: number | string;
decoration?: IDecorationOptions;
thickness?: number;
placeholder?: IPlaceholderOptions;
```

## Hooks

### `useMedia()`

This provides easy access to the width of the browser window.

```tsx
import { useMedia, Frame, Out } from 'nuggets';

export default () => {
  const { width, height } = useMedia();
  return (
    <Frame
      styles={{
        shape: {
          color: width > 600 ? 'green' : 'blue',
        }
        border: {
          color: 'black',
          thickness: height > 500 ? 3 : 10,
        },
      }}
    >
      <Out value={'This text changes color with the size of the window.'} />
    </Frame>
  );
};
```

#### `const { ...properties } = useMedia();`

##### Properties

- `width: number` the width of the window in pixels.
- `height: number` the height of the window in pixels.

### `useAddress()`

This gives you access to the current url of the page.

```tsx
import { useAddress, Frame, Out } from 'nuggets';

export default () => {
  const { change, backward, forward, pathname, search } = useAddress();
  return (
    <Frame>
      <Frame
        styles={{
          color: 'blue',
        }}
      >
        <Out value={`Pathname and search: ${pathname} ${search}`} />
      </Frame>
      <Frame events={{ click: () => change('/hello-nuggets') }}>
        <Out value={'Go to hello nuggets'} />
      </Frame>
      <Frame events={{ click: backward }}>
        <Out value={'Go back'} />
      </Frame>
      <Frame events={{ click: forward }}>
        <Out value={'Go forward'} />
      </Frame>
    </Frame>
  );
};
```

The `useAddress()` hook can be used to create a routers.

```tsx
import { useAddress } from 'nuggets';
import { Dashboard, Settings, Login, SignUp, NotFound } from './mycomponents';

export default () => {
  const { match } = useAddress();
  const { route } = [
    { path: '/dashboard', exact: true, route: <Dashboard /> },
    { path: '/settings', route: <Settings /> },
    { path: '/login', route: <Login /> },
    { path: '/sign-up', route: <SignUp /> },
  ].find(({ path, exact }) => match({ path, exact }));
  return route || <NotFound />;
};
```

#### `const { ...properties } = useAddress();`

##### Properties

- `change(address: string)` change location to address.
- `shift(entries: number)` move forward or backward in history.
- `forward()` move forward in history by one.
- `backward()` move backward in history by one.
- `pathname: string` the location path.
- `search: string` the query params of the location.
- `hash: string` the hash fragment in the location.
- `entries: number` the number of locations in the location history.

### `useStyles()`

Compile styles into css and attach to the document. It returns the class name which can be added to components which are not in the nuggets lib.

```tsx
import { useStyle } from 'nuggets';
import { Editor } from 'some-code-editor';

export default () => {
  const { css, name } = useStyles({
    shape: {
      height: 100,
      color: 'green',
    },
  });
  return <Editor className={name} />;
};
```

#### `const { ...properties } = useStyles({ ...styles });`

##### Properties

- `css: object` an object containing css properties.
- `name: string` the class name associated with the css properties.

### `useString()`

This manages a simple value such as a number or string.

```tsx
import { useString, Frame, Out, In } from 'nuggets';
import { NiceFrame } from './mycomponents';

export default ({ valueChange }) => {
  const { value, change, adjust } = useString({
    adjust: data => data.toUpperCase(),
    change: valueChange,
  });
  return (
    <NiceFrame>
      <In
        value={value}
        change={change}
        adjust={adjust}
      />
      {/* validations */}
      {value.length < 5 && <Out>Value is not long enough.</Out>}
      {hasBadChars(value) && <Out>Value contains some bad characters.</Out>}
    </NiceFrame>
  );
};
```

#### `const { ...properties } = useString({ ...options });`

##### Properties

Options

- `value: string` use this value to update override the current value.
- `change(value: string)` this is run when the value changes.
- `adjust(value: string): string` perform adjustments on the value before updating.

Properties

- `value: string` the current string value.
- `change(value: string)` set a new string value.

### `useNumber()`

This manages a simple value such as a number or string.

```tsx
import { useNumber, Frame, Out, In } from 'nuggets';
import { NiceFrame } from './mycomponents';

export default ({ valueChange }) => {
  const { value, change } = useNumber({
    adjust: data => data % 100,
    change: valueChange,
  });
  return (
    <NiceFrame>
      <In
        value={value}
        change={change}
      />
      {/* validations */}
      {value.length < 5 && <Out>Value is not long enough.</Out>}
      {hasBadChars(value) && <Out>Value contains some bad characters.</Out>}
    </NiceFrame>
  );
};
```

#### `const { ...properties } = useNumber({ ...options });`

##### Options

- `value: number` use this value to update override the current value.
- `change(value: number)` this is run when the value changes.
- `adjust(value: number): number` perform adjustments on the value before updating.

##### Properties

- `value: number` the current number value.
- `change(value: number)` set a new number value.

### `useComplex()`

This manages a object with sub properties - similar to a form.

```tsx
import { useComplex } from 'nuggets';
import { CustomButton, FieldText, FieldEmail, FieldPassword } from './mycomponents';

export default ({ person, valueChange, savePerson }) => {
  const { operate, value } = useComplex({
    value: person,
    change: valueChange,
  });
  return (
    <Frame>
      <FieldText change={data => operate('password').change(data)} />
      <FieldEmail change={operate('email').change} />
      <FieldPassword {...operate('password')} />
      <CustomButton events={{ click: () => savePerson(value) }}>
        Save
      </CustomButton>
    </Frame>
  );
};
```

#### `const { ...properties } = useComplex({ ...options });`

##### Options

- `value: object` use this value to update override the current value.
- `change(value: object)` this is run when the value changes.

##### Properties

- `value: object` the current number value.
- `operate(property: string)` get operators for changing a sub property.
- `change(value: object)` patch the entire object.
- `override(value: object)` set the entire object.

### `useToggle()`

This provides a set of state and state changers for managing a toggled value.

```tsx
import { useToggle, Frame } from 'nuggets';

export default ({ value, change }) => {
  const { active, off, on } = useToggle({ value, change });
  return (
    <Frame
      events={{
        click: active ? off : on,
      }}
      styles={{
        shape: {
          color: active ? 'green' : 'blue',
        },
      }}
    />
  );
};
```

There is also a simple `toggle` property which makes it a little easier.

```tsx
import { useToggle, Frame } from 'nuggets';

export default ({ value, change }) => {
  const { toggle, active } = useToggle({ value, change });
  return (
    <Frame
      events={{ click: toggle }}
      styles={{
        shape: {
          color: active ? 'green' : 'blue',
        },
      }}
    />
  );
};
```

#### `const { ...properties } = useToggle({ ...options });`

##### Options

- `value: boolean` use this value to update override the current value.
- `change(value: boolean)` this is run when the value changes.

##### Properties

- `active: boolean` the current toggle state.
- `on()` set the state to `true`.
- `off()` set the state to `false`.
- `toggle()` toggle the current active state.

### `useDatetime()`

Manage a datetime by setting sub-properties.

```tsx
import { useDatetime, Frame, In } from 'nuggets';

export default ({ value, change }) => {
  const { date, month, year, hour, minute, second, millisecond } = useDatetime({ value, change });
  return (
    <Frame>
      <In
        value={date.value}
        change={date.change}
      />
      <In
        value={month.value}
        change={month.change}
      />
      <In {...year} />
      <In {...hour} />
      <In {...minute} />
      <In {...second} />
      <In {...millisecond} />
    </Frame>
  );
};
```

#### `const { ...properties } = useDatetime({ ...options });`

##### Options

- `value: Date` use this value to update override the current value.
- `change(value: Date)` this is run when the value changes.

##### Properties

- `const { value, change } = date | month | year | ...etc;`
  - `date`
  - `month`
  - `year`
  - `hour`
  - `minute`
  - `second`
  - `millisecond`

### `useArray()`

Manage an array of values.

```tsx
import { useArray, Frame, Out } from 'nuggets';

export default ({ value, change, listOfPeople = [] }) => {
  const { includes, add, remove } = useArray({ value, change });
  return listOfPeople.map(({ id, name }) => (
    <Frame
      key={id}
      events={{
        click: () => includes(id) ? add(id) : remove(id),
      }}
      styles={{
        shape: {
          color: includes(id) ? 'green' : 'blue',
        }
      }}
    >
      <Out value={name} />
    </Frame>
  );
};
```

There is also a simple `toggle` attribute which makes the above code a little easier.

```tsx
import { useArray, Frame, Out } from 'nuggets';

export default ({ value, change, listOfPeople = [] }) => {
  const { includes, toggle } = useArray({ value, change });
  return listOfPeople.map(({ id, name }) => (
    <Frame
      key={id}
      events={{ click: () => toggle(id) }}
      styles={{
        shape: {
          color: includes(id) ? 'green' : 'blue',
        }
      }}
    >
      <Out value={name} />
    </Frame>
  );
};
```

#### `const { ...properties } = useArray({ ...options });`

##### Options

- `value: any[]` use this value to update override the current value.
- `change(value: any[])` this is run when the value changes.

##### Properties

- `includes(value: any): boolean` detects whether an item is in the array.
- `add(value: any)` add the item to the array.
- `remove(value: any)` remove the value from the array.
- `toggle(value: any)` toggle (add or remove) the value in the array.

### `createStore()` & `useStore()`

Share data across multiple components.

```tsx
import { createStore } from 'nuggets';

export interface IAuthStore {
  userId: string;
}

export const authStore = createStore<IAuthStore>({
  defaults: {
    userId: null,
  },
});
```

```tsx
import { useStore, Frame, Out } from 'nuggets';
import { authStore } from './stores';

export default () => {
  const { value, change } = useStore({ store: authStore });
  return (
    <Frame>
      <Out value={`Auth id: ${value.userId}`} />
      <Frame events={{ click: () => change({ userId: null }) }}>
        <Out value={'Reset your auth.'} />
      </Frame>
    </Frame>
  );
};
```

#### `const { ...properties } = useStore({ ...options });`

##### Options

- `store` a store - created using `createStore`.

##### Properties

- `value: object` the value of the store.
- `change(value: object)` patch the store with new values.

### `createConnection()` & `useConnection()`

Easily connect to and manage external data sources.

```tsx
import { createConnection } from 'nuggets';
import apollo from '../utils/apollo';

export interface IQueryConnection {
  query: string;
  variables: {
    [name: string]: string | number | boolean | undefined;
  }
}

export const queryConnection = createConnection<IQueryConnection>({
  handler: ({ query, variables }) => {
    return apollo.query({ query, variables })
      .then(({ data }) => data);
  }
});
```

```tsx
import gql from 'graphql-tag';
import { useConnection, Frame, Out } from 'nuggets';
import { queryConnection } from './connections';

interface IGetUser {
  user: {
    id: string;
    name: string;
  };
}

const GetUser = queryConnection({
  defaults: {
    query: gql`
      query GetUser($id: String!) {
        user(id: $id) {
          id
          name
        }
      }
    `,
  }
});

export default ({ id }) => {
  const { value, error, execute, refresh } = useConnection<IGetUser>({
    connection: GetUser,
  });
  useEffect(() => execute({ variables: { id } }));
  return (
    <Frame>
      <Frame styles={{ color: 'blue' }}>
        <Out value={`User name and id: ${value.user.name} ${value.user.id}`} />
      </Frame>
      <ErrorHandler error={error} />
      <SimpleButton click={refresh} />
    </Frame>
  );
};
```

#### `const { ...properties } = useConnection({ ...options });`

##### Options

- `connection` a connection - created using `createConnection`.
- `defaults: object` the default values passed to the connection.

##### Properties

- `value: object` the latest value provided by the connection.
- `error: object` an error caught by the connection.
- `loading: boolean` whether the app connection is currently loading.
- `execute(variables: object)` call the connection handler.
- `refresh()` call the connection handler with the same values as the last call.

## Authors

- Jack Scott [@jacrobsco](https://twitter.com/jacrobsco) - I tweet about my coding and startups.