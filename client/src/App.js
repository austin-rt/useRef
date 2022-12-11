import { useRef, useEffect } from 'react';

function App() {
  const rendersRef = useRef(0);
  const emailRef = useRef();
  const passwordRef = useRef();
  const formSectionRef = useRef();
  const renderCountSectionRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email: emailRef.current.value, password: passwordRef.current.value });
  };

  const scrollToElement = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    rendersRef.current++;
  });

  return (
    <main>
      <section ref={formSectionRef}>
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
        <button
          onClick={() => {
            scrollToElement(renderCountSectionRef);
          }}
        >
          Scroll to Render Count
        </button>
      </section>
      <section ref={renderCountSectionRef}>
        <h3>Render Count: {rendersRef.current}</h3>
        <button
          onClick={() => {
            scrollToElement(formSectionRef);
          }}
        >
          Scroll to Form
        </button>
      </section>
    </main>
  );
}

export default App;
