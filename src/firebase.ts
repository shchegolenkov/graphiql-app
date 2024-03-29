import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import store from './store/store';
import { setUser, removeUser } from './store/user/user.slice';
import ErrorToast from './components/CustomToast/ErrorToast';
import SuccessToast from './components/CustomToast/SuccessToast';

import 'react-toastify/dist/ReactToastify.css';

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const fetchUser = () => {
  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      localStorage.setItem('email', user.email!);
      localStorage.setItem('id', user.uid!);
      store.dispatch(setUser({ email: user.email, id: user.uid }));
    }
  });
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    SuccessToast('Login successfully!');
    return true;
  } catch (err) {
    ErrorToast(`${err}`);
    return false;
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });
    SuccessToast('Registered successfully!');
    return true;
  } catch (err) {
    ErrorToast(`${err}`);
    return false;
  }
};

const logout = async () => {
  await signOut(auth);
  localStorage.removeItem('email');
  localStorage.removeItem('id');
  store.dispatch(removeUser());
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
