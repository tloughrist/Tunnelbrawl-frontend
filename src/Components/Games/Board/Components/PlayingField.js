import React from "react";
import Hand from './Hand.js';
import Fallen from './Fallen.js';
import Taken from './Taken.js';
import Board from './Board.js';
import Status from './Status.js';

export default function PlayingField() {

  return (
      <div id="playing_field">
        <Status />
        <Hand />
        <Fallen />
        <Taken />
        <Board />
      </div>
  );
};