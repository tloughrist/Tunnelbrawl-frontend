import React from "react";
import Hand from './Hand.js';
import Fallen from './Fallen.js';
import Taken from './Taken.js';
import Board from './Board.js'

export default function PlayingField({ setBoard }) {

  return (
      <div id="playing_field">
        <Hand setBoard={setBoard} />
        <Fallen setBoard={setBoard} />
        <Taken setBoard={setBoard} />
        <Board setBoard={setBoard} />
      </div>
  );
};