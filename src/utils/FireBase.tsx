// src/firebase.js
import { Environment } from './Environment';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: Environment.getEnvVariable('FIREBASE_API_KEY'),
  authDomain: Environment.getEnvVariable('FIREBASE_AUTH_DOMAIN'),
  databaseURL: Environment.getEnvVariable('FIREBASE_DATABASE_URL'),
  projectId: Environment.getEnvVariable('FIREBASE_PROJECT_ID'),
  storageBucket: Environment.getEnvVariable('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: Environment.getEnvVariable('FIREBASE_MESSAGING_SENDER_ID'),
  appId: Environment.getEnvVariable('FIREBASE_APP_ID'),
};

export const FirebaseApp = initializeApp({
  ...firebaseConfig
});
