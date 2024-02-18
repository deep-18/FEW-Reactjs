import firebase from "firebase/app";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
});


export const auth = firebaseApp.auth()
export default firebaseApp
