import { useRef, useEffect } from 'react';

function App() {
  const rendersRef = useRef(0);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email: emailRef.current.value, password: passwordRef.current.value });
  };

  useEffect(() => {
    rendersRef.current++;
  });

  return (
    <main>
      <section>
        <h3>Render Count: {rendersRef.current}</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Email'
            ref={emailRef}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            ref={passwordRef}
          />
          <button type='submit'>Login</button>
        </form>
      </section>
    </main>
  );
}

export default App;
