import React from 'react'
import Cell from '../Cell/Cell'
import Row from '../Row/Row'

function makeField() {
  const cells = []
  for (let i = 1; i <= 100; i += 1) {
    cells.push(<Cell id={i} />)
  }
  const arrField = []
  while (cells.length > 0) {
    const row = cells.splice(0, 10)
    arrField.push(<Row>{row}</Row>)
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
