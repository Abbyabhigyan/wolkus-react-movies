import React from "react";
import axios from "axios";
import {useAuth} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import "../components/Header/Header.css";

const Login = ()=>{
    const {signIn,signInWithGoogle} = useAuth();
    const history = useHistory();
   const handleGoogleSignIn = async()=>{
        signInWithGoogle();
        history.push('/trending');
   }
    return(
        <div style={{textAlign:"center"}}>
            <button className="google-btn" onClick={handleGoogleSignIn}>Sign in with google</button>
        </div>
    )
}

export default Login;