import React from "react";

function Rank({name,rank}) {
    return(
        <div className="rank" style={{color:"white",display:"flex",flexDirection:"column",alignItems:"center",marginBlock:"1.5rem"}}>
            <h3>{`${name}, your current rank is`}</h3>
            <h2>{`#${rank}`}</h2>
        </div>
    )
}

export default Rank;