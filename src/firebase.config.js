import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtm2V_8SRsdTGRTPw8Bv9yGJqBH5xl7kQ",
  authDomain: "house-market-8be12.firebaseapp.com",
  projectId: "house-market-8be12",
  storageBucket: "house-market-8be12.appspot.com",
  messagingSenderId: "76997720492",
  appId: "1:76997720492:web:d751ce1f8a53a56cb5e209",
  measurementId: "G-PLQF8ZGFG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();