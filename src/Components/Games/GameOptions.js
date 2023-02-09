import React, { useState, useEffect } from "react";
import moment from 'moment';

export default function GameOptions({ game, selectedGame }) {

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedGame).length > 0) {
      const isMatch = game.id === selectedGame.game.id;
      setIsSelected(isMatch);
    }
  }, [selectedGame]);

  return (
    <option
      value={game.id}
      selected={isSelected}
    >
      {game.title} created by {game.host} on {moment(game.created_at.substring(0,7), "YYYY:MM:DD").format("MM/DD/YY")}
    </option>
  );
};