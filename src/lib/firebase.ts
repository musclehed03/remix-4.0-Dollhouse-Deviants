import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey !== "");

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

if (isFirebaseConfigured) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    // You **MUST** use the firestoreDatabaseId from the firebase-applet-config.json file
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    storage = getStorage(app);
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
  }
} else {
  console.warn("Firebase is not configured.");
}

export { app, auth, db, storage, isFirebaseConfigured };
