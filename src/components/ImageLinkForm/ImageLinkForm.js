import React from "react";
import "./ImageLinkForm.css";

function ImageLinkForm({onInputChange,onInputSubmit}) {
    return(
        <div className="imageLinkForm">
            <input type="text" onChange={onInputChange}/>
            <button onClick={onInputSubmit}>Find Face</button>
        </div>
    );
}

export default ImageLinkForm;