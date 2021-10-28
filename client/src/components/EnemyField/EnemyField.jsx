import React from 'react'
import { useGameContext } from '../../contexts/game.context'

export default function EnemyField() {
const { makeField } = useGameContext()
  const field = makeField()

  return (
    
    
    <div onClick={(e)=>{
     if  ("cell" in e.target.dataset){
       e.target.style.backgroundColor = "green"
     } 
    }} id="enemyfield" className="field">
      <h1>enemy</h1>
      {field.map((item) => item)}

    </div>
    
  )
}

