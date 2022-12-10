# Demystifying React Hooks - useRef

![](./assets/png/useRef-header-small.png)

In this article, we will discuss some common use cases for React's `useRef` Hook.

## Getting Started

If you'd like to follow along in your local IDE, you can find the GitHub Repo [here](https://github.com/austin-rt/useRef).

- `fork and clone`
- `cd client`
- `npm i`
- `npm start`

## Starter Code

As always, we'll start with a tour of our current codebase. This time, `App.js` is a simulated Login Form.

First, we have `initialFormValues`, an object with a blank email and password, which we use to initialize our `formValues` state.

```js
const initialFormValues = {
  email: '',
  password: '',
};

const [formValues, setFormValues] = useState(initialFormValues);
```

We then have boilerplate `handleChange` and `handleSubmit` functions.

```js
const handleChange = (e) => {
  setFormValues({
    ...formValues,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('form submitted');
};
```

We have a `useEffect`, 'tracking' `formValues`, and logging 'rendered' to the console, effectively letting us know when our component re-renders.

```js
useEffect(() => {
  console.log('rendered');
}, [formValues]);
```

Our JSX renders the form and assigns the appropriate `onChange` and `onSubmit` attributes.

```js
return (
  <main>
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
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
        <button>Login</button>
      </form>
    </section>
  </main>
);
```

So you may be asking, _"What's wrong with this component? It works as expected, and I've written forms like this countless times."_

So have I, friend. So have I.

Let's start by creating a new state called `renders`, initializing it to `0`, and rendering it in our JSX.

```js

```
