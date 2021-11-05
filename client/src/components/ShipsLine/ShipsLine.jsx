import React from 'react';
import Ship from '../Ship/Ship';

function ShipsLine({ ships }) {
  return (
    <div className="d-flex flex-row my-2">
      {ships.map((ship) => <Ship size={ship} />)}
    </div>
  );
}

export default ShipsLine;