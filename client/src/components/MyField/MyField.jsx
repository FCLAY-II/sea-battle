import React from 'react'
import { useGameContext } from '../../contexts/game.context'


export default function Field() {

  const { makeField } = useGameContext()
  const field = makeField()

  return (

    <div id="myfield" className="field">
      <h1>my field</h1>

      {field.map((item) => item)}
    </div>
  )
}
