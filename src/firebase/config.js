import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: `${apiKey}`,
  authDomain: "olx-clone-40de3.firebaseapp.com",
  projectId: "olx-clone-40de3",
  storageBucket: "olx-clone-40de3.appspot.com",
  messagingSenderId: "511809125642",
  appId: "1:511809125642:web:486a2693e178efe03b0ef3",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };