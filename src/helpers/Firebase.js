import firebase from 'firebase/app';
import 'firebase/auth';

// initalizing firebase
const app = firebase.initializeApp({
    apiKey: "AIzaSyBcd26rkgcdPiC_h_0nkjM8tcHnY_t-Q7U",
    authDomain: "where-to-meet---development.firebaseapp.com",
    projectId: "where-to-meet---development",
    storageBucket: "where-to-meet---development.appspot.com",
    messagingSenderId: "160982784034",
    appId: "1:160982784034:web:9809c0107bc635f608d27b",
    measurementId: "G-4YWG157KWX"
})

export const auth = app.auth();
export default app;
