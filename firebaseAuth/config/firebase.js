// Import the functions you need from the SDKs you need
import { initializeApp,getApp } from "firebase/app";
import {collection, getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJlL8DSjQDigPVpZRM_xACEtFuIJOD32s",
  authDomain: "login-94e03.firebaseapp.com",
  projectId: "login-94e03",
  storageBucket: "login-94e03.appspot.com",
  messagingSenderId: "576139769594",
  appId: "1:576139769594:web:7f9269bd8b6c4b25373b43",
  measurementId: "G-C28JB2WR3H"
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const dbService = getFirestore(app);

export const tripsRef = collection(dbService, 'trips');
export const expenseRef = collection(dbService,'expense');