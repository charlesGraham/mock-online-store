import { useState } from 'react';
import FormInput from '../form-input/form-input.component';

import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../../utils/firebase/firebase';

const SignUpForm = () => {
  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

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
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocFromAuth(user, { displayName });
      resetFormFields();
    } catch (err) {
      if (error.code === 'auth/email-alread-in-use') {
        alert("Cannot create user. Email already in use");
      } else console.log(err.message);
    }
  }



  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" onChange={handleChange} name="displayName" value={displayName} required />

        <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required />

        <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />

        <FormInput label="Confirm Password" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
