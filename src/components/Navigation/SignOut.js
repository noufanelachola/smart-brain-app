import React from "react";

function SignOut({onRouteChange,isSigned}) {
    
    if(isSigned){       
        return( 
            <div className="signOut flex items-center" onClick={() => onRouteChange("SignIn")} style={{cursor: "pointer"}}>
                <p className="mr4 " style={{color:"white"}} >Sign Out</p>
            </div>
        );
    }
    else {
        return(
            <div className="signOut flex items-center"  style={{cursor: "pointer"}}>
                <p  className="mr4 " style={{color:"white"}} onClick={() => onRouteChange("SignIn")} >Sign In</p>
                <p  className="mr4 " style={{color:"white"}} onClick={() => onRouteChange("Register")}>Register</p>
            </div>
        );
    }
}

export default SignOut;