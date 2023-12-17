import React from "react";
import Logo from "./Logo";
import SignOut from "./SignOut";
import "./Navigation.css";

function Navigation(props) {
    return(
        <div className="navigation">
            <Logo />
            <SignOut onRouteChange={props.onRouteChange} isSigned={props.isSigned}/>
        </div>
    )
}

export default Navigation;