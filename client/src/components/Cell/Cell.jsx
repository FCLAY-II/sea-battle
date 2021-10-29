import React from 'react'

export default function Cell({id, cellState}) {
  return (
    cellState === '3' ? <div data-cell  id={id} className="goodshot">
    </div> : (cellState === '2' ? <div data-cell  id={id} className="badshot" >
    </div> : ( cellState === '4' ? <div data-cell  id={id} className="killedcell"></div> : 
    <div data-cell  id={id} className="cell"></div>) )
  
  )
}

