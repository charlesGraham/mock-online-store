import { useState, useContext } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context';
import './sign-in-form.styles.scss';

import { signInWithGooglePopup, createUserDocFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase';

const SignInForm = () => {
  const defaultFormFields = {
    email: '',
    password: '',
  }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

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

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(err);
      }
    }
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocFromAuth(user);
  }



  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required />
        <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle} >Google Sign In</Button>
        </div>

      </form>
    </div>
  );
}

export default SignInForm;
