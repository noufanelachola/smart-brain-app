import React from "react";
import Logo from "./Logo";
import SignOut from "./SignOut";
import "./Navigation.css";

function Navigation() {
    return(
        <div className="navigation">
            <Logo />
            <SignOut/>
        </div>
    )
}

export default Navigation;