
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCncBPAu0aA5lMvo_yI12IvmAJmYexYVVY",
  authDomain: "ammaconstruction-db736.firebaseapp.com",
  projectId: "ammaconstruction-db736",
  storageBucket: "ammaconstruction-db736.firebasestorage.app",
  messagingSenderId: "950078485562",
  appId: "1:950078485562:web:fccf2d88873ec160ffb103"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
