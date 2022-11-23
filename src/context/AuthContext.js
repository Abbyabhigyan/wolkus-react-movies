import React,{createContext,useContext,useState,useEffect} from 'react'
import {auth,db} from '../firebase/firebase'
import {GoogleAuthProvider,signInWithPopup,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth'
import {addUser} from "../firebase/userData";
import {doc,getDoc} from 'firebase/firestore'
import {useHistory} from "react-router-dom";

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){

    const [currentUser, setCurrentUser] = useState();
    const [isLoading,setIsLoading] = useState(true);
    const history = useHistory();

    //-------------------------------NORMAL SIGN UP SIGN IN FUNCTIONS ----------------------------//
    function signUp(email,password,userName,profilePic){
        return createUserWithEmailAndPassword(auth,email,password);
    }
    function signIn(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }
    //---------------------------------END OF NORMAL SIGN UP SIGN IN FUNCTIONS ----------------------//

    //--------------------------------- SIGN IN WITH PROVIDERS ----------------------------------------//
    function signInWithGoogle(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
            .then(async(result) => {
                const user = result.user;
                console.log("User given by popup: ",user);
                //------------- Checking if the user already exists
                const docRef = doc(db,"users",user.uid);
                const userDoc = await getDoc(docRef);
                if(!userDoc.exists()){
                    await addUser(user);
                }
            }).catch((error) => {
            console.log(error);
        });
    }
    //--------------------------------- END OF SIGN IN WITH PROVIDERS ----------------------------------------//

    function logOut(){
        history.push('/');
        return signOut(auth);
    }

    //--------------------------------- REAL TIME CHECKING IF USER IS ALREADY SIGNED IN ----------------------------------------//
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,user=>{
            setCurrentUser(user);
            setIsLoading(false);
            if(currentUser!=null){
                history.push('/trending');
            }else{
                history.push('/');
            }
            console.log("HERE IS OUR USER",user);
        });

        return unsubscribe;

    }, [currentUser,history]);

    //-----OBJECT CONTAINING VALUES AND FUNCTION THAT CAN BE USED ANYWHERE IN CHILD COMPONENTS IN THE WHOLE PROJECT------------
    const value = {
        currentUser,
        signUp,
        signIn,
        signInWithGoogle,
        logOut
    }
    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}


