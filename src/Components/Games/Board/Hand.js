import React, { useContext } from "react";
import Space from './Space.js';
import { handSpaces } from '../Checkers.js';
import { ColorContext } from '../Game.js';

export default function Hand() {

  const color = useContext(ColorContext);

  return (
    <div>
      <div>
        <div className={`space space--${color}`} id="deck">

        </div>
      </div>
      <div className="row" id="hand">
        <Space color={`space--${color}`} id={handSpaces(color)[0]} />
        <Space color={`space--${color}`} id={handSpaces(color)[1]} />
        <Space color={`space--${color}`} id={handSpaces(color)[2]} />
        <Space color={`space--${color}`} id={handSpaces(color)[3]} />
      </div>
    </div>

  );
};