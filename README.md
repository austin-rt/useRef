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

As always, we'll start with a tour of our current codebase. This time, `App.js` is a simulated Login Form. First, we have `initialFormValues`, an object with a blank email and password, which we use to initialize our `formValues` state.

We then have boilerplate `handleChange` and `handleSubmit` functions. Our JSX renders the form and assigns the appropriate `onChange` and `onSubmit` attributes.
