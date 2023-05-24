import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC8uBZgv9oXi6pWpVEK27yxEbM-ykQDu7A",
  authDomain: "mock-online-store.firebaseapp.com",
  projectId: "mock-online-store",
  storageBucket: "mock-online-store.appspot.com",
  messagingSenderId: "355233398357",
  appId: "1:355233398357:web:252a22cdba49b7ac3b1edc",
  measurementId: "G-2GLR3LHJWH"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const provider = new GoogleAuthProvider();
// Always force user to select an account to authenticate with
provider.setCustomParameters({
  prompt: "select_account"
});


// Auth
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

// database
export const db = getFirestore();


// Create user
export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (err) {
      console.log('Error creating user' + err.message);
    }
  }

  return userDocRef;
}