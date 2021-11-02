import React from 'react';

export default function Row({ cells }) {
  return <div className="field-row">{cells.map((item) => item)}</div>;
}
