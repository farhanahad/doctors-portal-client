import initializeFirebase from "../Pages/Login/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut } from "firebase/auth";
import { useEffect, useState } from "react";

//initialize firebase app
initializeFirebase();
const useFirebase=()=>{
    const [user,setUser]=useState({});
    const [isLoading,setIsLoading]=useState(true);
    const [authError,setAuthError]=useState('');


    const auth = getAuth();


    const registerUser=(email,password)=>{
      setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            setAuthError('');
            // ...
          })
          .catch((error) => {
            setAuthError(error.message);
            
          })
          .finally(()=>setIsLoading(false));
    }

    const loginUser=(email,password,location,history)=>{
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const destination=location?.state?.from || '/';
    history.replace(destination);
    setAuthError('');
  })
  .catch((error) => {
    setAuthError(error.message);
  })
  .finally(()=>setIsLoading(false));
    }

    //Observe user state
    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
          });
          return ()=>  unsubscribe;
    },[])
    const logout=()=>{
      setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          .finally(()=>setIsLoading(false));
    }

    return {
        user,
        isLoading,
        registerUser,
        loginUser,
        authError,
        logout,
    }

}
export default useFirebase;