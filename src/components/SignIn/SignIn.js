import React from "react";
import { useState } from "react";

function SignIn({onRouteChange,loadUser}) {

    const [signInState,setSignInState] = useState({
        signInEmail : "",
        signInPass : ""
    })

    const onSignInEmailChange = (event) => {
        setSignInState({
            ...signInState,
            signInEmail : event.target.value
        });
    }
    
    const onSignInPassChange = (event) => {
        setSignInState((prevSignInState) => ({
            ...prevSignInState,
            signInPass: event.target.value 
        }));
    }

    const onSignInSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/signin",{
            method : 'post',
            headers : {"Content-Type" : 'application/json'},
            body : JSON.stringify({
                email : signInState.signInEmail,
                password : signInState.signInPass
            })
        }).then(response => response.json())
            .then(user => {
                if(user.id){
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
                        <legend className="f4 fw6 ph0 mh0 center">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={onSignInEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={onSignInPassChange}
                            />
                        </div>
                        {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in" 
                            onClick={onSignInSubmit}
                            // onClick={() => onRouteChange("Home")}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <a href="#0" className="f6 link dim black db" onClick={() => onRouteChange("Register")}>Register now!!</a>
                        {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                    </div>
                </form>
            </main>
        </article>    
    )
}

export default SignIn;