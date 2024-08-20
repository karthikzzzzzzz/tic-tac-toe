import React from "react";
import { useState } from "react";

export default function Player(props){
    const [plyname,setplyname]=useState(props.name);
    const [isediting, setisediting] =useState(false);
    function Onclick(){
        setisediting((editing)=>!editing);
        if(isediting){
        props.onchangename(props.symbol,plyname);
        }


    }
    function Change(event){
        
        setplyname(event.target.value);
        
    }
    let output= <span className="player-name">{plyname}</span>
    let btncap='Edit';
    
    if(isediting){
        output=<input type="text" required value={plyname} onChange={Change}/>
        btncap="Save";
    }
    return(
        <li className={props.isActive ? 'active':undefined}>
         <span className="player">
            {output}
          
          <span className="player-symbol">{props.symbol}</span>
          </span>
          <button onClick={Onclick}>{btncap}</button>
        </li>    

    );
}