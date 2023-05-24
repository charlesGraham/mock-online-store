import React, { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocFromAuth } from '../../utils/firebase/firebase';

const SignIn = () => {
  useEffect(() => {
    const getResult = async () => {
      const response = await getRedirectResult(auth);
      console.log(response);

      if (response) {
        const userDocRef = await createUserDocFromAuth(response.user);
      }
    }

    getResult();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  }


  return (
    <div>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button>
    </div>
  );
}

export default SignIn;
