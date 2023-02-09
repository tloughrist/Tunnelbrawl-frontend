import React, { useState, useEffect } from "react";
import moment from 'moment';

export default function GameOptions({ game, selectedGame }) {

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (selectedGame !== "none") {
      const isMatch = game.id === parseInt(selectedGame);
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