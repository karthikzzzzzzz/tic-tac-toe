import React, { useState } from "react";
import Player from "./assets/components/player";
import Gameboard from "./assets/components/gameboard";
import Log from "./assets/components/log";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";
import Gameover from "./assets/components/gameover";

const arr=[
  [null,null,null],[null,null,null],[null,null,null]
];

function deriveactiveplayer(turns) {
    if (turns.length === 0) return 'X';
    const lastPlayer = turns[0].player;
    return lastPlayer === 'X' ? 'O' : 'X';
}

function App() {
  const [players,setplayers]= useState({
    X: 'PLAYER1',
    O:'PLAYER2',

  });
  //const[haswinner,gotwinner]=useState('false');
    const [gameturns, setgameturns] = useState([]);
    const activeplr = deriveactiveplayer(gameturns);
    let initial=[...arr.map(array=>[...array])];
    let winner;
    for(const turn of gameturns){
        const {square , player}=turn;
        const{row,col}=square;
        initial[row][col]=player;
        }

    for(const combi of WINNING_COMBINATIONS){
      const firstsquare=initial[combi[0].row][combi[0].column];
      const secondsquare=initial[combi[1].row][combi[1].column];
      const thirdsquare=initial[combi[2].row][combi[2].column];

      if(firstsquare&&firstsquare===secondsquare&&firstsquare===thirdsquare){
        winner=players[firstsquare];
      }
    }
    const hasdraw =gameturns.length===9 && !winner;
    


    function SelectSquare(rowindex, colindex) {
     

        setgameturns(prevturns => {
            const currentplayer = deriveactiveplayer(prevturns);
            const updturns = [{ square: { row: rowindex, col: colindex }, player: currentplayer }, ...prevturns];
            return updturns;
        });
    }
    function handlerestart(){
      setgameturns([]);
    }
    function handleplayernamechange(symbol,newname){
      setplayers(prevplayer=>{
        return{
          ...prevplayer,
          [symbol]:newname
        };
      });

    } 

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name="player1" symbol="X" isActive={activeplr === 'X'} onchangename={handleplayernamechange}  />
                    <Player name="player2" symbol="O" isActive={activeplr === 'O'} onchangename={handleplayernamechange}/>
                </ol>
                {(winner ||hasdraw) && <Gameover winner={winner} onrestart={handlerestart}/>}
                <Gameboard onsetply={SelectSquare} board={initial} />
            </div>
            <Log turns={gameturns} />
        </main>
    );
}

export default App;
