import { useState, useEffect } from 'react';

function App() {
  const initialFormValues = {
    email: '',
    password: '',
  };

  const [formValues, setFormValues] = useState(initialFormValues);

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

  useEffect(() => {
    console.log('rendered');
  }, [formValues]);

  return (
    <main>
      <section>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            email='email'
            placeholder='Email'
            onChange={handleChange}
          />
          <input
            type='password'
            password='password'
            placeholder='Password'
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      </section>
    </main>
  );
}

export default App;
