import {db} from './firebase'
import {doc,setDoc} from 'firebase/firestore'

const addUser = async(user)=>{
    const userObj = {
        uid:user.uid,
        name:user.displayName,
        email: user.email,
        profilePic:user.photoURL,
        admin:false
    }
    try{
        await setDoc(doc(db, "users", user.uid), userObj);

    }catch (error){
        console.log(error);
    }
}


export {addUser};