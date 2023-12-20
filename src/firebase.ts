import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB3ejl3Cm9ylzT59aajg7Qpdt6d8eW3r8U',
  authDomain: 'planb-graphiql.firebaseapp.com',
  projectId: 'planb-graphiql',
  storageBucket: 'planb-graphiql.appspot.com',
  messagingSenderId: '1051406424238',
  appId: '1:1051406424238:web:336b2c3e91844eb517b53f',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('Logged in!');
    })
    .catch((err) => {
      alert(err);
    });
};

const registerWithEmailAndPassword = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const user = res.user;
      addDoc(collection(db, 'users'), {
        uid: user.uid,
        authProvider: 'local',
        email,
      }).then(() => {
        alert('Registered successfully!');
      });
    })
    .catch((err) => {
      alert(err);
    });
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
