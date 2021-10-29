import React from 'react'
import { useGameContext } from '../../contexts/game.context'

export default function EnemyField() {
const { makeField, game, makeTurnReact} = useGameContext()
  const currStateOfEnemyField = game.enemyField.split('')
  const field = makeField(currStateOfEnemyField)
  



  return (
    
    
    <div onClick={(e)=>{
     if  ("cell" in e.target.dataset){
       makeTurnReact(e.target.id.toString())
     } 
    }} id="enemyfield" className="field">
      <h1>enemy</h1>
      {field.map((item) => item)}
    </div>
    
  )
}
