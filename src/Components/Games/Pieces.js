import React, { useState } from 'react'

function Pieces() {

  const [location, setLocation] = useState();
  
    return (
      <div>
        <img id="test_piece_img" src="./pieces/red_pawn.png" alt="pawn" />
      </div> 
    );
};

export default Pieces;