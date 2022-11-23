import React from 'react';
import {useAuth} from "../../context/AuthContext";

const CredBox = ()=> {
    const {currentUser,logOut} = useAuth();
    return (
        <div className="credentials">
            {currentUser && (
                <>
                    <p>{currentUser.displayName}</p>
                    <button className="logout-btn" onClick={logOut}>Log Out</button>
                </>
            )}

        </div>
    );
}

export default CredBox;