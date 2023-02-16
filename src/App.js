import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';

function App() {
const [board,setBoard] = useState(Array(9).fill(null));
const [isX,setIsX] = useState(true);
const [scoreX,setScoreX] = useState(0);
const [scoreO,setScoreO] = useState(0);


function handleClick(index){
  const newBoard = [...board];
  if (calculateWinner(board) || newBoard[index]) {
    return;
  }
  newBoard[index] = isX ? 'X' : 'O';
  setBoard(newBoard);
  setIsX(!isX);

}

function calculateWinner(tabla){
  const lines =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  for(let i=0;i<lines.length;i++){
    const [a,b,c] = lines[i];
    if(tabla[a] && tabla[a] === tabla[b] && tabla[a] === tabla[c]){
      return tabla[a];
    }
  }
  return null;
}

function Square(index){
  return(
      <button className='square' onClick={()=>handleClick(index)}>{board[index]}</button>
  )
}
function Reset(){
  setBoard(Array(9).fill(null));
  setIsX(true);
}


const winner = calculateWinner(board);
const status = winner ? `Winner: ${winner}` : `Next player: ${isX ? 'X' : 'O'}`;

useEffect(() => {
  if (winner) {
    if (winner === 'X') {
      setScoreX(scoreX + 1);
    } else if (winner === 'O') {
      setScoreO(scoreO + 1);
    }
  }
}, [winner]);


  return (
    <div className="App">
      <div className='boardRow'>
      {Square(0)}
      {Square(1)}
      {Square(2)}
      </div>
      <div className='boardRow'>
      {Square(3)}
      {Square(4)}
      {Square(5)}
      </div>
      <div className='boardRow'>
      {Square(6)}
      {Square(7)}
      {Square(8)}
      </div>
      <div className='status'>
        {status}
      </div>
      <div className='scoreX'>
        X Score is : {scoreX}
      </div>
      <div className='scoreO'>
        O Score is :{scoreO}
      </div>
      <button className="reset" onClick={Reset}>Rematch !</button>
    </div>
  );
}

export default App;
