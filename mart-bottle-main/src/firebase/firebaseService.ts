import { createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, signOut } from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase auth service
const auth = getAuth(app);

const database  = getFirestore(app)


// Function to handle errors
const handleAuthError = (error: any) => {
  // You can customize error handling based on your application's requirements
  console.error('Firebase Authentication Error:', error.message);
  throw error; // Rethrow the error for the caller to handle
};

// Function to sign up a new user
export const signUp = async (email: string, password: string): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    handleAuthError(error);
  }
};

// Function to sign in an existing user
export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    handleAuthError(error);
  }
};

// Function to sign out the current user
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    handleAuthError(error);
  }
};

export { auth , database };