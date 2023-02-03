import React, {useContext} from 'react';
import { BoardContext } from './Board.js';

function Space({ color, id }) { 
  
  const board = useContext(BoardContext);
  //console.log(board)

  function findContents(locNum) {
    const obj = board.find(({loc}) => loc === locNum);
    return obj.contents;
  };

  const occupant = findContents(parseInt(id));

  return (
    <div
      className={`space ${color} ${occupant.type} ${occupant.acro} ${occupant.highlight}`}
      id={id}
    >
      {occupant.img}
    </div>
  );
};

export default Space;