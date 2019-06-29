# nuggets

> 📯 Goodbye HTML & CSS. Hello Nuggets.

Nuggets is a replacement for HTML & CSS. Written with React & TypeScript, Nuggets was designed to be the easiest way to build a UI. Import it easily into any npm (and yarn) based web app.

```shell
npm i --save nuggets
```

## About

I built nuggets because I realised that regular HTML & CSS had a number of problems. These problems included slow development speeds and a low robustness of code. As such I attempted to build a library which "minimised decisions" as the main goal.

Typing is fast. Decisions are slow.

The reason why we choose TypeScript was because good code editors can provide **method previews** with TypeScript variables. That way you'll always know what options are available as your begin to type. We also chose to use React because it provides some excellent data structures such as the hook. This powerful tool enables us to build both beautiful and reactive layouts very easily.

Hope you enjoy it as much as I am.

- Jack [@jacrobsco](https://twitter.com/jacrobsco) founder of [Window Gadgets](https://windowgadgets.io).

## Usage

The following demonstrates some of what's possible with the `nuggets` library.

```jsx
import * as React from 'react';
import { Node, useBoolean, useSchema } from 'nuggets';

/**
 * ❤️🔥😻❤️🔥😻❤️🔥😻❤️🔥😻❤️🔥😻❤️🔥😻❤️🔥😻❤️🔥😻
 * A new way to style components and handle events
 *
 * ❤️ Only one element... the <Node />!
 * 🔥 Styles are merged with DOM structure to encourage component based styling over than class based styling.
 * 😻 Flexible styles which can take multiple data types.
 */
const StylesAndEventsComponent = ({ children }) => {
  const toggle = useBoolean();
  return (
    <Node
      events={({ index }) => ({
        click: () => console.log(`This is child: ${index})`);
        mouseEnter: () => toggle.on(),
        mouseLeave: () => toggle.off(),
      })}
      styles={({ hover }) => ({
        shape: {
          color: toggle.value ? 'red' : 'green', // 😻
          height: 500,
          grow: true,
        },
        characters: {
          size: 20,
          family: 'monospace',
          color: 'hsl(0, 0%, 20%)',
        },
        structure: { // arrangement of children
          direction: 'right',
          wrap: false,
          divide: 30,
          important: true, // enforce the divide style
          arrange: 'start',
          align: 'center',
        },
        absorb: { // same as a negative margin in CSS
          top: 40,
          sides: 40,
        },
        padding: hover ? 50 : {
          sides: 30,
          verts: 100,
        },
        shadows: {
          color: 'hsl(200, 80%, 90)', // HSL is the awesome
          size: 30,
          scale: 10,
          down: 3,
          across: 3,
          inside: false, // inside shadow
        },
        borders: {
          top: 3,
          sides: 10,
          color: 'green',
          style: 'dashed',
        },
      })}
    >
      {children}
    </Node>
  );
};

/**
 * 👊🎉😎👊🎉😎👊🎉😎👊🎉😎👊🎉😎👊🎉😎👊🎉😎👊🎉
 * Use properties instead of different HTML tags
 *
 * 👊 Easy to use portals.
 * 🎉 Change an element from editable to static with a boolean.
 * 😎 Nodes have an internal state or value.
 */
const LotsOfPropetiesComponent = () => {
  const personSchema = useSchema({
    initial: {
      name: 'Fred',
    },
    schema: {
      name: value => {
        return yup.string().required().validate(value);
      },
    },
  });
  const { name } = personSchema.properties;
  return (
    <Node
      reference={ref}
      portal={document.getElementById('modals')}
      value={name.value}
      events={{ change: value => name.change(value) }}
      placeholder="Your name"
      editable={true}
      multiline={name.value.length ? 3 : false}
      id="same-as-html-id"
      classname="same-as-html-class"
      data={{ mode: 'popup' }} // data-mode="popup"
      aria={{ label: 'Nuggets Modal' }}
      css={{ backgroundColor: 'yellow' }}
      attrs={{ role: 'submit' }}
      clean={false} // clean will remove all default css styles
    />
  );
};

const const MadeForWindowGadgets = () => {
  <StylesAndEventsComponent>
    <LotsOfPropetiesComponent />
  </StylesAndEventsComponent>
}
```

Made with ❤️ 😅 😂 by [Jack](https://twitter.com/jacrobsco).

Powering **[Window Gadgets](https://windowgadgets.io)**.
