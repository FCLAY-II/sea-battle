import React from 'react';

export default function Row({ num, cells }) {
  return <div className="field-row">
    <span className='field-label'>{num}</span>
    {cells.map((item) => item)}
  </div>;
}
