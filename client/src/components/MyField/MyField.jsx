import React from 'react'
import Row from '../Row/Row'

function makeField(comp) {
  let arr = []
  for (let i = 1; i <= 10; i++) {
    arr.push(comp)
  }
  return arr
}




export default function Field() {
  const field = makeField(<Row />)

  
  return (
    <div id="myfield" className="field">

      {field.map((item)=> item)}
    </div>
  )
}
