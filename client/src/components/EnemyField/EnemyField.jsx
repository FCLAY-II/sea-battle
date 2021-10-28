import React from 'react'
import Cell from '../Cell/Cell'
import Row from '../Row/Row'

function makeField() {
  let cells = []
  for (let i = 1; i <= 100; i++) {
    cells.push(<Cell id={i} />)
  }
  let arrField = []
  while (cells.length > 0) {
    let row = cells.splice(0, 10)
    arrField.push(<Row>{row}</Row> )
  }
  return arrField
}

export default function EnemyField() {

  // const field = makeField(<Row />)
  const field = makeField()
  return (
    <div id="enemyfield" className="field">
      {field.map((item) => item)}

    </div>
  )
}

