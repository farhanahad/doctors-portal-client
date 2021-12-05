import initializeFirebase from "../Pages/Login/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,onAuthStateChanged,signInWithPopup,updateProfile,signOut } from "firebase/auth";
import { useEffect, useState } from "react";

//initialize firebase app
initializeFirebase();
const useFirebase=()=>{
    const [user,setUser]=useState({});
    const [isLoading,setIsLoading]=useState(true);
    const [authError,setAuthError]=useState('');


    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();


    const registerUser=(email,name,password,history)=>{
      setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            setAuthError('');
            const newUser={email,displayName:name};
            setUser(newUser);
             //save user to the database
             saveUser(email,name,'POST');
            //send name to firebase after creation
            updateProfile(auth.currentUser, {
              displayName:name
            }).then(() => {
            }).catch((error) => {
              
            });
            history.replace('/');
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

    const signInWithGoogle=(location,history)=>{
      setIsLoading(true);
      signInWithPopup(auth, googleProvider)
  .then((result) => {
    
    const user = result.user;
    saveUser(user.email,user.displayName,'PUT');
    setAuthError('');
    const destination=location?.state?.from || '/';
    history.replace(destination);
  
  }).catch((error) => {
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

    const saveUser = (email, displayName,method) => {
        const user = { email, displayName };
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        user,
        isLoading,
        registerUser,
        loginUser,
        signInWithGoogle,
        authError,
        logout,
    }

}
export default useFirebase;