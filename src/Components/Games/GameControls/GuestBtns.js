import React, {useContext} from "react";
import {leaveGame} from "./ButtonFunctions.js";
import { UserContext } from '../../../App';

export default function GuestButtons({ }) {

  const user = useContext(UserContext);

  return (
    <div>
      <button onClick={leaveGame}>Leave Game</button>
    </div>
  );
};