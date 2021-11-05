import React from 'react';
import ShipsLine from '../ShipsLine/ShipsLine';

export default function ShipsContainer({ ships }) {
  return (
    <div className="d-flex flex-column justify-content-center">
      {ships.map((shipsOfOneType) => <ShipsLine ships={shipsOfOneType} />)}
    </div>
  );
}
