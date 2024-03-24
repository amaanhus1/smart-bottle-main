// firebase.js or firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDoM4WpXo0lv3ZTmdANVARoipzjoXjmqQk",
  authDomain: "martbottl.firebaseapp.com",
  projectId: "martbottl",
  storageBucket: "martbottl.appspot.com",
  messagingSenderId: "218842294417",
  appId: "1:218842294417:web:ba8922f6329bfa356cf730",
  measurementId: "G-QFG5RZZKJD"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Get Firebase auth service
const auth = getAuth(firebase);
// Initialize Firebase


export default {firebase , auth };
