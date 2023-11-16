import React from "react";
import "./FaceRecognition.css"

function FaceRecognition(props) {
    return(
        <div className="faceRecognition flex justify-center">
            {props.imageSrc && <img alt="faceRecognition" src={props.imageSrc}/>}
        </div>
    )
}

export default FaceRecognition;