import React from 'react'
import Row from '../Row/Row'

function makeField(comp) {
  const arr = []
  for (let i = 1; i <= 10; i += 1) {
    arr.push(comp)
  }
  return arr
}

export default function Field() {
  const field = makeField(<Row />)

  return (
    <div id="myfield" className="field">
      {field.map((item) => item)}
    </div>
  )
}
