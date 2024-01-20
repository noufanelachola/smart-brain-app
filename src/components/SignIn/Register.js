import React from "react";
import { useState } from "react";

function Register({onRouteChange,loadUser}) {

    const [registerState,setRegisterState] = useState({
        name : "",
        email : "",
        password : "",
    })

    const nameChange = (event) => {
        setRegisterState({
            ...registerState,
            name : event.target.value
        });
    }
    
    const emailChange = (event) => {
        setRegisterState({
            ...registerState,
            email : event.target.value
        });
    }
    
    const passChange = (event) => {
        setRegisterState((prevRegisterState) => ({
            ...prevRegisterState,
            password: event.target.value
        }));
    }
    
    

    const onRegisterSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/register",{
            method : 'post',
            headers : {"Content-Type" : 'application/json'},
            body : JSON.stringify(registerState)
        }).then(response => response.json())
            .then(user => {
                console.log(user)
                if(user.name && user.email){
                    console.log("true")
                    onRouteChange("Home");
                    loadUser(user);
                }
            });
    }

    return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
            <main className="pa4 black-80">
                <form className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0 center">Register</legend>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="text">Full Name</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
                                type="text" 
                                name="text"  
                                id="text"
                                onChange={nameChange}    
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={emailChange}    
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={passChange}
                            />
                        </div>
                        {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" 
                            onClick={onRegisterSubmit}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        {/* <a href="#0" className="f6 link dim black db">Sign up</a>
                        <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                    </div>
                </form>
            </main>
        </article>    
    )
}

export default Register;