import { useState, useContext } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context';
import './sign-up-form.styles.scss';

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

  const { setCurrentUser } = useContext(UserContext);

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
      setCurrentUser(user);
      resetFormFields();
    } catch (err) {
      if (error.code === 'auth/email-alread-in-use') {
        alert("Cannot create user. Email already in use");
      } else console.log(err.message);
    }
  }



  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" onChange={handleChange} name="displayName" value={displayName} required />

        <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required />

        <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />

        <FormInput label="Confirm Password" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
