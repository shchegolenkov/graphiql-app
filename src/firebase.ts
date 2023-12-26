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

// onAuthStateChanged(auth, (user: User | null) => {
//   if (user) {
//     store.dispatch(setUser({ email: user.email, id: user.uid }));
//   } else {
//     store.dispatch(removeUser());
//   }
// });
export const fetchUser = async () => {
  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      store.dispatch(setUser({ email: user.email, id: user.uid }));
    } else {
      store.dispatch(removeUser());
    }
  });
};

// const logInWithEmailAndPassword = (email: string, password: string) => {
//   signInWithEmailAndPassword(auth, email, password)
//     .then(() => {
//       alert('Logged in!');
//     })
//     .catch((err) => {
//       alert(err);
//     });
// };
const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Logged in!');
  } catch (err) {
    alert(err);
  }
};

// const registerWithEmailAndPassword = (email: string, password: string) => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((res) => {
//       const user = res.user;
//       addDoc(collection(db, 'users'), {
//         uid: user.uid,
//         authProvider: 'local',
//         email,
//       }).then(() => {
//         alert('Registered successfully!');
//       });
//     })
//     .catch((err) => {
//       alert(err);
//     });
// };
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
    alert('Registered successfully!');
  } catch (err) {
    alert(err);
  }
};

const logout = async () => {
  await signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
