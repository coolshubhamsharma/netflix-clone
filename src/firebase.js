import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { setPersistence, browserLocalPersistence } from "firebase/auth"; // Add this import
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); //initilized authentication 
const db = getFirestore(app) //initilized database

const signup  = async(name , email , password)=>{
    try{

       const res =  await createUserWithEmailAndPassword(auth, email , password);   
       const user = res.user;

       await addDoc(collection(db , "user") , {
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       })

    }
    catch(error){
       console.error("error" , error);
       toast.error(error.code.split('/')[1].split('-').join(' ')); //splicing the error message
    }


}


const login = async(email , password)=>{
    try{

        await setPersistence(auth, browserLocalPersistence); // This ensures the session is stored
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
        // console.log("User logged in successfully:", user);
        console.log("User logged in successfully:");

    }
    catch(error){

        console.log("error logging in" , error);
        toast.error(error.code.split('/')[1].split('-').join(' '));

    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth , db , login , signup , logout};