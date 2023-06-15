import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrJM_ddQbDTnYu6Y3RDH7bSjTLxXbWTPw",
  authDomain: "webcastle-b6129.firebaseapp.com",
  projectId: "webcastle-b6129",
  storageBucket: "webcastle-b6129.appspot.com",
  messagingSenderId: "409499209940",
  appId: "1:409499209940:web:3add0f4e32308304496b41",
};

firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
export { auth, firebase };
