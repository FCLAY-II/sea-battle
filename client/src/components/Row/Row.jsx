import React from 'react';

export default function Row({ cells }) {
  return <div className="row">{cells.map((item) => item)}</div>;
}
