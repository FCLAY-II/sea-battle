import React from 'react';

function chooseClass(cellState) {
  switch (cellState) {
    case '2':
      return 'badshot';
    case '3':
      return 'goodshot';
    case '4':
      return 'killedcell';
    case '1':
      return 'shipcell';

    default:
      return 'field-cell';
  }
}

export default function Cell({ id, cellState }) {
  return (
    <div data-cell id={id} className={chooseClass(cellState)} />
  );
}
