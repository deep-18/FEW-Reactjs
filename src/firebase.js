import firebase from "firebase/app";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCSrKqa8vmB2V8sKlT11do_iTBBuQrAt5w",
    authDomain: "furniture-ecomm-website-49470.firebaseapp.com",
    databaseURL: "https://furniture-ecomm-website-49470-default-rtdb.firebaseio.com",
    projectId: "furniture-ecomm-website-49470",
    storageBucket: "furniture-ecomm-website-49470.appspot.com",
    messagingSenderId: "450579094036",
    appId: "1:450579094036:web:107c37ab7828e12778e501",
    measurementId: "G-M4F6D9YG6V"
});


export const auth = firebaseApp.auth()
export default firebaseApp
