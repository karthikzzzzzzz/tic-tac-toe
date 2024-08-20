import { useState } from "react";

export default function Gameboard({onsetply,board}){
    
    //const [initial,final]=useState(arr);
    //function HandleClick(rowindex,colindex){
      //  final((prev)=>{
        //    const upd=[...prev.map(innerarr=>[...innerarr])]
          //  upd[rowindex][colindex]=activeplayesymbol;
            //return upd;
       // })
       // onsetply();

    //}
    return(
        <ol id="game-board">
            {board.map((row,rowindex)=>(<li key={rowindex}>
            <ol>
                {row.map((col,colindex)=>(
                <li key={colindex}>
                <button onClick={()=>onsetply(rowindex,colindex)} disabled={col!==null}>{col}</button>
                </li>
                ))}
            </ol>
            </li>
            ))}

        </ol>
    );
}


