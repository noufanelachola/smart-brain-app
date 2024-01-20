import './App.css';
import 'tachyons';
import Navigation from "./components/Navigation/Navigation"; 
import Rank from "./components/Rank/Rank"; 
import Description from "./components/Description/Description"; 
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/facerecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/SignIn/Register';

import ParticlesBg from 'particles-bg';
import { useState } from 'react';

function App() {

  const [imagelink,setImageLink] = useState("");
  const [box,setBox] = useState({});
  const [route,setRoute] = useState("SignIn");
  const [isSigned,setIsSigned] = useState(false);
  const [profile,setProfile] =useState({
    id : 0,
    name : "",
    email : "",
    entries : 0,
    joined : ""
  })

    const calculateBoundingBox = (data) => {
      const boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;
      // console.log("akjsdfh",boundingBox);
      const inputImage = document.getElementById("inputImage");
      const imageheight = Number(inputImage.height);
      const imagewidth = Number(inputImage.width);
      return {
        leftCol : boundingBox.left_col * imagewidth ,
        topRow : boundingBox.top_row * imageheight ,
        rightCol : imagewidth - (boundingBox.right_col * imagewidth) ,
        bottomRow : imageheight - (boundingBox.bottom_row * imageheight)
      }
    }

    const loadUser = (user) => {
      setProfile({
        id : user.id,
        name : user.name,
        email : user.email,
        entries : user.entries,
        joined : user.joined
      })
      setImageLink("");
    }
 
  function onInputChange(event) {
    setImageLink(event.target.value);
    setBox({});
  }

  function onInputSubmit() {
    fetch("http://localhost:3000/imageurl",{
        method : "post",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({image : imagelink})
      })
    .then(response => response.json())
    .then(result => {
      setBox(calculateBoundingBox(result));
      
      fetch("http://localhost:3000/image",{
        method : "put",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({id: profile.id})
      })
      .then(resp => resp.json())
      .then(count => {
        console.log("resp from db",count)
        setProfile(prevProfile => ({ ...prevProfile, entries: count }));
        console.log(profile);
      })
    }).catch(error => console.log('error', error));

    // .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
    // .catch(error => console.log('error', error))
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
    // console.log("box",box);
  }

  const onRouteChange = (page) => {
    setRoute(page);
    if(page === "Home"){
      setIsSigned(true);
    }
    else{
      setIsSigned(false);
    }
  } 


  return (
    <div className="App center">
      <Navigation onRouteChange={onRouteChange} isSigned={isSigned}/>
      {
        route === "Home" 
          ? 
            <div>
              <Rank name={profile.name} rank={profile.entries} />
              <Description />
              <ImageLinkForm onInputChange={onInputChange} onInputSubmit={onInputSubmit}/>
              <FaceRecognition box={box} imageSrc={imagelink}/>
              <ParticlesBg type="color" bg={true} />
            </div>
          : (
              route === "SignIn" 
                ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
                : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
            )
      }  
      <ParticlesBg type="color" bg={true} />
    </div>   
  );
}

export default App;
