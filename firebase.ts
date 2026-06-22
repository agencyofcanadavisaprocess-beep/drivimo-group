import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection References
export const workersCollection = collection(db, 'workers');
export const contactsCollection = collection(db, 'contacts');

export { app, db };
