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


    const PAT = '9adee5fcd2114e51ad526e42d3c1ee94';
    const USER_ID = 'noufan_elachola';       
    const APP_ID = 'initial-face-recognition';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = imagelink;

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

    

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
 

  function onInputChange(event) {
    setImageLink(event.target.value)
  }

  function onInputSubmit() {
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => {
      setBox(calculateBoundingBox(result));
    })
    .catch(error => console.log('error', error));

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
              <Rank />
              <Description />
              <ImageLinkForm onInputChange={onInputChange} onInputSubmit={onInputSubmit}/>
              <FaceRecognition box={box} imageSrc={imagelink}/>
              <ParticlesBg type="color" bg={true} />
            </div>
          : (
              route === "SignIn" 
                ? <SignIn onRouteChange={onRouteChange} />
                : <Register onRouteChange={onRouteChange} />
            )
      }  
      <ParticlesBg type="color" bg={true} />
    </div>   
  );
}

export default App;
