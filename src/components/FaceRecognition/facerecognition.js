import React from "react";
import "./FaceRecognition.css"

function FaceRecognition({imageSrc,box}) {
    return(
        <div className="faceRecognition">
            {imageSrc && <img alt="faceRecognition" id="inputImage" src={imageSrc}/>}
            <div className="bounding-box" style={{left: box.leftCol, right: box.rightCol, top: box.topRow, bottom: box.bottomRow}}></div>
        </div>
    )
}

export default FaceRecognition;