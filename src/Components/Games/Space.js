import React, { useState } from 'react';

function Space({ color, id, occupant, draggedPiece, setLoc }) {


  return (
    <div className={'space ' + color} id={id} >
      {occupant}
    </div>
  );
};

export default Space;