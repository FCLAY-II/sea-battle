import React from 'react';

export default function Row({ num, cells }) {
  return <div className="field-row">
    <span style={{fontSize: '0.7rem', width: '20px'}}>{num}</span>
    {cells.map((item) => item)}
  </div>;
}
