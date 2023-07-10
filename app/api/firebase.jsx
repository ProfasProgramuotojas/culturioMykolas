// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9EDY2khPKGJwyY749oxqLCezDamhEN1s",
  authDomain: "createevent-fd94a.firebaseapp.com",
  projectId: "createevent-fd94a",
  storageBucket: "createevent-fd94a.appspot.com",
  messagingSenderId: "12858016463",
  appId: "1:12858016463:web:b1b32bba85140c91d7edba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);