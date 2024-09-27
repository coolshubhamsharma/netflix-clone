import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { setPersistence, browserLocalPersistence } from "firebase/auth"; // Add this import
import { toast } from "react-toastify";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAIG49zjpdEqTD-seMtsnejxPaezL9OFI",
  authDomain: "netflix-clone-fbcff.firebaseapp.com",
  projectId: "netflix-clone-fbcff",
  storageBucket: "netflix-clone-fbcff.appspot.com",
  messagingSenderId: "1084678815786",
  appId: "1:1084678815786:web:970ade0e72bddfc6448353"
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
        console.log("User logged in successfully:", user);

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