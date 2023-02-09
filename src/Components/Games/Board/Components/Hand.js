import React, { useContext } from "react";
import Space from './Space.js';
import { handSpaces } from '../../Helpers/Checkers.js';
import { ColorContext } from '../../Game.js';

export default function Hand({ setBoard }) {

  const color = useContext(ColorContext);

  return (
    <div>
      <div>
        <div className={`space space--${color}`} id="deck">

        </div>
      </div>
      <div className="row" id="hand">
        <Space color={`space--${color}`} id={handSpaces(color)[0]} setBoard={setBoard} />
        <Space color={`space--${color}`} id={handSpaces(color)[1]} setBoard={setBoard} />
        <Space color={`space--${color}`} id={handSpaces(color)[2]} setBoard={setBoard} />
        <Space color={`space--${color}`} id={handSpaces(color)[3]} setBoard={setBoard} />
      </div>
    </div>

  );
};