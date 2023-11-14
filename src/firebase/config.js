import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC6Q53txue1sqO1I6ZSdGscWq7cxvkvO20",
    authDomain: "cook-book-react-1c3c9.firebaseapp.com",
    projectId: "cook-book-react-1c3c9",
    storageBucket: "cook-book-react-1c3c9.appspot.com",
    messagingSenderId: "437215117572",
    appId: "1:437215117572:web:14bc5cbd9f1bceb1e2d051"
};

//initializing firebase
initializeApp(firebaseConfig)

//init services
const db = getFirestore() //firestore database
const auth = getAuth() //firebase authentication

export { db, auth }