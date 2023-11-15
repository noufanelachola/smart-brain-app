import React from "react";

function FaceRecognition(props) {
    return(
        <div className="FaceRecognition">
            {props.imageSrc && <img alt="faceRecognition" src={props.imageSrc}/>}
        </div>
    )
}

export default FaceRecognition;