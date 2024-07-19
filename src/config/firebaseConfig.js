// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA016220tkSJrewCbwQVRYlD2d1fNaJ4Zc",
  authDomain: "foodiefriends-658ab.firebaseapp.com",
  databaseURL:
    "https://foodiefriends-658ab-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "foodiefriends-658ab",
  storageBucket: "foodiefriends-658ab.appspot.com",
  messagingSenderId: "210232921141",
  appId: "1:210232921141:web:ef3b41c66c357fc194757c",
  measurementId: "G-SZC9TWLVT8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics, app };
