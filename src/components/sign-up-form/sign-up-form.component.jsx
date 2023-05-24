import { useState } from 'react';

import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase';

const SignUpForm = () => {
  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    //TODO: check if user was authenticated with email and password
    try {
      const response = await createAuthUserWithEmailAndPassword(email, password);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }

  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input type="text" onChange={handleChange} name="displayName" value={displayName} required />

        <label>Email</label>
        <input type="email" onChange={handleChange} name="email" value={email} required />

        <label>Password</label>
        <input type="password" onChange={handleChange} name="password" value={password} required />

        <label>Confirm Password</label>
        <input type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
