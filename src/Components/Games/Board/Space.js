import React, {useContext} from 'react';
import { BoardContext } from '../Game.js';

export default function Space({ color, id }) { 

  const board = useContext(BoardContext);
  
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