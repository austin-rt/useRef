import { useState } from 'react';

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
    console.log(formValues);
  };

  return (
    <main>
      <section>
        <form onSubmit={handleSubmit}>
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
}
export default App;
