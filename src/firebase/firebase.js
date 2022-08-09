import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLqms4DVEKBvPuGypOAnxoELMo4mWHIx4",
  authDomain: "whats-for-dinner-742952.firebaseapp.com",
  projectId: "whats-for-dinner-742952",
  storageBucket: "whats-for-dinner-742952.appspot.com",
  messagingSenderId: "936499655652",
  appId: "1:936499655652:web:dd62504375febb6d1e0df1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
