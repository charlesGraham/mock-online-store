import React from 'react';
import { signInWithGooglePopup, createUserDocFromAuth } from '../../utils/firebase/firebase';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  }

  return (
    <div>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
    </div>
  );
}

export default SignIn;
