import React from 'react'
import Cell from '../Cell/Cell'

function makeRow() {
  const arr = []
  for (let i = 1; i <= 10; i += 1) {
    arr.push(<Cell />)
  }
  return arr
}

export default function Row() {
  const row = makeRow()

  return <div className="row">{row.map((item) => item)}</div>
}
