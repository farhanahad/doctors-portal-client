import initializeFirebase from "../Pages/Login/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,signOut } from "firebase/auth";
import { useEffect, useState } from "react";

//initialize firebase app
initializeFirebase();
const useFirebase=()=>{
    const [user,setUser]=useState({});
    const auth = getAuth();
    const registerUser=(email,password)=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }

    //Observe user state
    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
            } else {
                setUser({});
            }
          });
          return ()=>  unsubscribe;
    },[])
    const logout=()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

    return {
        user,
        registerUser,
        logout,
    }

}
export default useFirebase;