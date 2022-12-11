# Demystifying React Hooks - useRef

![](./assets/png/useRef-header-small.png)

In this article, we will discuss some common use cases for React's `useRef` Hook.

## Getting Started

In this walkthrough, we will use the Profiler from the React Dev Tools to see how our components are rendering. If you don't have the React Dev Tools and plan to follow along, you'll need to pause and download it now.

- [Chrome React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Firefox React Dev Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

If you'd like to follow along in your local IDE, you can find the GitHub Repo [here](https://github.com/austin-rt/useRef).

- `fork and clone`
- `cd client`
- `npm i`
- `npm start`

## Starter Code

As always, we'll start with a tour of our codebase. First, you may notice we removed `StrictMode` from our `index.js`. Since we'll be counting renders, I didn't want any Strict Mode renders to confuse our demonstrations. And this time, `App.js` is a simulated Login Form.

We have `initialFormValues`, an object with a blank email and password, which we use to initialize our `formValues` state.

```js
const initialFormValues = {
  email: '',
  password: '',
};

const [formValues, setFormValues] = useState(initialFormValues);
```

We then have boilerplate `handleChange` and `handleSumbit` functions, and the `handleSubmit` logs `formValues` to the console.

```js
const handleChange = (e) => {
  setFormValues({
    ...formValues,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formValues);
};
```

Finally, our JSX renders the form and assigns the appropriate `onChange` and `onSubmit` attributes.

```js
return (
  <main>
    <section>
      <form>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <button type='submit'>Login</button>
      </form>
    </section>
  </main>
);
```

## What's the Problem?

So you may be asking, _"What's wrong with this component? It works as expected, and I've written forms like this countless times."_

So have I, friend. So have I.

Open your React Dev Tools and click the Settings cog. Click the 'Profiler' tab and tick on the option, "Record why each component rendered while profiling."

Now open the Profiler tab, and you will see a blue dot in the upper left corner. Click it to start profiling. Type in the inputs and click the (now red) dot to stop profiling.

Click the App component on the left, and you'll see a list of all the renders. You'll notice that the component re-renders for every keystroke.

## Minimizing Renders

If our form's sole purpose is to submit the inputs elsewhere, then we don't care what the value is while the user is typing. We only care about the value when the form is submitted.

This may seem harmless in a small application, but it can significantly impact our application as it scales. And part of being a good React developer is being mindful of the performance of our applications by minimizing renders.

## Enter [`useRef`](https://beta.reactjs.org/apis/react/useRef)

In the broadest sense, the `useRef` Hook is a tool to create a mutable variable that persists between renders. It provides the ability to store a value we can access outside the render cycle.

Let's try using `useRef` to store our render count.

We'll start by importing `useRef` in our current import.

```js
import React, { useState, useRef } from 'react';
```

We will initialize `renders` with `useRef` and set it to 0.

```js
const rendersRef = useRef(0);
```

Then we'll increment `renders` every time the component renders. To do this, we'll use a `useEffect` Hook without the dependency array.

```js
import { useState, useRef, useEffect } from 'react';

...

useEffect(() => {
  rendersRef.current++;
});
```

When we initialize a `ref`, the Hook creates an object with a `current` property. This is the property we use to update the current value.

Let's render `renders` in our JSX.

```js
<section>
  <h3>Render Count: {rendersRef.current}</h3>
  <form onSubmit={handleSubmit}>
          ...
```

When we type in the input, we see our render count incrementing in real-time. This is cool but not particularly useful.

From the React Docs:

<blockquote>
<code>useRef</code> returns a ref object with a single current property initially set to the initial value you provided.

On the next renders, <code>useRef</code> will return the same object. You can change its <code>current</code> property to store information and read it later. This might remind you of state, but there is an important difference.

<strong>Changing a ref does not trigger a re-render.</strong> This means refs are perfect for storing information that doesn’t affect the visual output of your component.

</blockquote>

_information that doesn’t affect the visual output of your component_

Kind of like a login form, huh?

## Refactoring Our Form with `useRef`

Let's start by creating two new `refs` to store our `email` and `password` values and initializing them as empty strings.

```js
const emailRef = useRef('');
const passwordRef = useRef('');
```

When using the `useRef` Hook to reference a DOM element, associating it is incredibly simple. All we need to do is add a `ref` attribute to the element and provide it our `ref` variable as its value.

```js
<input
  type='email'
  name='email'
  placeholder='Email'
  ref={emailRef}
  onChange={handleChange}
  />

  ...

<input
  type='password'
  name='password'
  placeholder='Password'
  ref={passwordRef}
  onChange={handleChange}
  />
```

Next, we need to refactor our `handleSubmit` function. Instead of logging `formValuse`, we'll create an object, setting the values as each `ref`s' `current` property.

```js
const handleSubmit = (e) => {
  e.preventDefault();
  console.log({
    email: emailRef.current.value
    password: passwordRef.current.value
    });
};
```

Type in the inputs and click 'Login'. You should have seen your object logged.

With that working, we no longer need the following:

- email `onChange` attribute
- password `onChange` attribute
- `handleChange` function
- `formValues` state
- `initialFormValues` object
- `useState` import

Though we aren't directly using it, we should keep the `name` attributes for accessibility.

Now when we type in our inputs, notice the render count. It remains 0. Our component no longer renders with each keystroke!
