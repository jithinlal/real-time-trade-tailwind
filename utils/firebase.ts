import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import "firebase/compat/performance";

const config = {
  apiKey: "AIzaSyANvPLTLY3cHrBL3qD4Sy2-WVVJH4qNI-k",
  authDomain: "trade-app-fb3e7.firebaseapp.com",
  projectId: "trade-app-fb3e7",
  storageBucket: "trade-app-fb3e7.appspot.com",
  messagingSenderId: "236128634014",
  appId: "1:236128634014:web:f5a2632cb00bd44b3de78f",
  measurementId: "G-W64XR510JN",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);

  // if (typeof window !== undefined) {
  //   if ("measurementId" in config) {
  //     firebase.analytics();
  //     firebase.performance();
  //   }
  // }
}

const firestore = firebase.firestore();

export { firestore };
