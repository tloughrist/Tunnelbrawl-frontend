import React from "react";
import moment from 'moment';

export default function GameOptions({ game }) {

  return (
    <option value={game.id}>
      {game.title} created by {game.host} on {moment(game.created_at.substring(0,7), "YYYY:MM:DD").format("MM/DD/YY")}
    </option>
  );
};