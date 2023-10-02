import './App.css';
import Navigation from "./components/Navigation/Navigation"; 
import Rank from "./components/Rank/Rank"; 
import Description from "./components/Description/Description"; 
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg';

function App() {

  function setupClarifyApi(imageUrl){
    const PAT = '9adee5fcd2114e51ad526e42d3c1ee94';
    const USER_ID = 'noufan_elachola';       
    const APP_ID = 'initial-face-recognition';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = imageUrl;


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

    return requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
  }

  function onInputChange(event) {
    console.log(event.target.value);
  }

  function onInputSubmit() {
    console.log("clicked");
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

  }

  return (
    <div className="App">
      <Navigation/>
      <Rank />
      <Description />
      <ImageLinkForm onInputChange={onInputChange} onInputSubmit={onInputSubmit}/>
      <ParticlesBg type="color" bg={true} />
    </div>
  );
}

export default App;
