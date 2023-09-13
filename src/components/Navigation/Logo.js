import React from "react";
import Tilt from 'react-parallax-tilt';
import LogoImg from  "./Logo.png";

function Logo() {
    return(
        <Tilt style={{display:"inline-block"}} >
            <div className="logo" style={{  background:"white",height:"80px"}}>
                <img src={LogoImg} alt="logo" height={"100%"}/>
            </div>
        </Tilt>
    )
}

export default Logo;