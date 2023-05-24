import React from 'react';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { signInWithGooglePopup, signInWithGoogleRedirect, createUserDocFromAuth } from '../../utils/firebase/firebase';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  }


  return (
    <div>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
      <SignUpForm />
    </div>
  );
}

export default SignIn;
