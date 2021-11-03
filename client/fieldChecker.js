const sampleField = 
  '1000000010001001001000000000101101011000000100000000000000000000010000000000111100000000001110000000';

  function checkField(field) {
    const shipsSummary = {
      1: 4,
      2: 3,
      3: 2,
      4: 1,
    };
  
    const ALLOWED = true;
    const RESTRICTED = false;
    const SHIP = null;
  
    const prevRowState = new Array(10).fill(ALLOWED);
  
    const currentVShips = [];
  
    function scanHorizontal(fieldRef, rowI, colI, prevRowStateRef) {
      let len = 1;
      prevRowStateRef[colI] = RESTRICTED;
      while (colI + len < 10 && fieldRef[colI + len + rowI * 10] === '1') {
        if (prevRowStateRef[colI + len] === ALLOWED) {
          prevRowStateRef[colI + len] = RESTRICTED;
          len += 1;
        } else {
          return -1;
        }
      }
      if (colI + len < 10) {
        prevRowStateRef[colI + len] = RESTRICTED;
      }
      return len;
    }
  
    for (let colI = 0; colI < 10; colI += 1) {
      if (field[colI] !== '0') {
        if (colI > 0) {
          prevRowState[colI - 1] = RESTRICTED;
        }
        if (colI < 9 && field[colI + 1] !== '0') {
          const horShipLength = scanHorizontal(field, 0, colI, prevRowState);
          colI += horShipLength;
          if (horShipLength <= 4) {
            shipsSummary[horShipLength] -= 1;
          } else {
            console.log(colI); return false;
          }
        } else {
          if (colI < 9) {
            prevRowState[colI + 1] = RESTRICTED;
          }
          prevRowState[colI] = SHIP;
          currentVShips.push({
            ancor: colI,
            length: 1,
          });
        }
      }
    }
    console.log(currentVShips, prevRowState);
  
    for (let rowI = 1; rowI < 10; rowI += 1) {
      for (let colI = 0; colI < 10; colI += 1) {
        if (field[colI + 10 * rowI] !== '0') {
          if (prevRowState[colI] === RESTRICTED) {
            console.log(colI + 10 * rowI); return false;
          }
          if (colI > 0) {
            prevRowState[colI - 1] = RESTRICTED;
          }
          // if (prevRowState[colI] === SHIP) { // если над нами корабль
          //   const possibleShip = currentVShips.find((ship) => ship.ancor === colI);
          //   possibleShip.length += 1;
          //   if (possibleShip.length > 4) {
          //     console.log(colI + 10 * rowI); return false;
          //   }
          // }
          if (colI < 9 && field[colI + 1 + 10 * rowI] !== '0') {
            if (prevRowState[colI + 1] === RESTRICTED) {
              console.log(colI + 10 * rowI); return false;
            }
            const horShipLength = scanHorizontal(field, rowI, colI, prevRowState);
            if (horShipLength === -1 && horShipLength > 4) {
              console.log(colI + 10 * rowI); return false;
            }
            colI += horShipLength;
            shipsSummary[horShipLength] -= 1;
          } else {
            if (colI < 9) {
              prevRowState[colI + 1] = RESTRICTED;
            }
            if (prevRowState[colI] === SHIP) { // если над нами корабль
              const possibleShip = currentVShips.find((ship) => ship.ancor === colI);
              possibleShip.length += 1;
              if (possibleShip.length > 4) {
                console.log(colI + 10 * rowI); return false;
              }
            } else {
              prevRowState[colI] = SHIP;
              currentVShips.push({
                ancor: colI,
                length: 1,
              });
            }
            colI += 1;
          }
        } else { // если клетка пустая
          if (prevRowState[colI] === SHIP) {
            const possibleShipI = currentVShips.findIndex((ship) => ship.ancor === colI);
            const possibleShip = currentVShips[possibleShipI];
            shipsSummary[possibleShip.length] -= 1;
            currentVShips.splice(possibleShipI, 1);
          }
          prevRowState[colI] = ALLOWED;
        }
      }
      // console.log(currentVShips, prevRowState.toString());
    }
  
    for (let colI = 0; colI < 10; colI += 1) {
      const possibleShipI = currentVShips.findIndex((ship) => ship.ancor === colI);
      if (possibleShipI !== -1) {
        const possibleShip = currentVShips[possibleShipI];
        shipsSummary[possibleShip.length] -= 1;
        currentVShips.splice(possibleShipI, 1);
      }
    }

    console.log(currentVShips);

    for (const shipLength in shipsSummary) {
      if (Object.hasOwnProperty.call(shipsSummary, shipLength)
      && shipsSummary[shipLength] !== 0) {
        console.log('count', shipsSummary);
        return false;
      }
    }
  
    return true;
  }


// console.log();
console.log(checkField(sampleField));