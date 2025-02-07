//firebase.google.com
//Log In with my Gmail account
//Ctration of Firestore Database
//In the terminal: npm install firebase react-firebase-hooks
//-------------------------------------------------------------------------------------------------
//My account:
//  Name: Milen
//  Email: milen.mudov@gmail.com
//  Password: Mm123?

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyA9AimVrYmiJ9DgjF0OmoXuzF7KzP_lqBw",
    authDomain: "netflix-clone-1e740.firebaseapp.com",
    projectId: "netflix-clone-1e740",
    storageBucket: "netflix-clone-1e740.firebasestorage.app",
    messagingSenderId: "169431816297",
    appId: "1:169431816297:web:51f02dcd6e31eab4792af8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        //alert(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        //alert(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };
