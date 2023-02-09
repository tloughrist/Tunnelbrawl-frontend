import React from "react";
import Space from './Space.js';

export default function Board({ setBoard }) {

  return (
    <div className="board"> 
      <div className="row" id="row_1">
        <div className="space empty space--empty highlight--none side--left top" />
        <Space color={"space--green top"} id={"12"} setBoard={setBoard} />
        <Space color={"space--green top"} id={"13"} setBoard={setBoard} />
        <Space color={"space--green top"} id={"14"} setBoard={setBoard} />
        <Space color={"space--green top"} id={"15"} setBoard={setBoard} />
        <div className="space empty space--empty highlight--none side--right top" />
      </div>
      <div className="row" id="row_2">
        <Space color={"space--red side--left"} id={"21"} setBoard={setBoard} />
        <Space color={"empty"} id={"22"} setBoard={setBoard} />
        <Space color={"empty"} id={"23"} setBoard={setBoard} />
        <Space color={"empty"} id={"24"} setBoard={setBoard} />
        <Space color={"empty"} id={"25"} setBoard={setBoard} />
        <Space color={"space--blue side--right"} id={"26"} setBoard={setBoard} />
      </div>
      <div className="row" id="row_3">
        <Space color={"space--red side--left"} id={"31"} setBoard={setBoard} />
        <Space color={"empty"} id={"32"} setBoard={setBoard} />
        <Space color={"empty"} id={"33"} setBoard={setBoard} />
        <Space color={"empty"} id={"34"} setBoard={setBoard} />
        <Space color={"empty"} id={"35"} setBoard={setBoard} />
        <Space color={"space--blue side--right"} id={"36"} setBoard={setBoard} />
      </div>
      <div className="row" id="row_4">
        <Space color={"space--red side--left"} id={"41"} setBoard={setBoard} />
        <Space color={"empty"} id={"42"} setBoard={setBoard} />
        <Space color={"empty"} id={"43"} setBoard={setBoard} />
        <Space color={"empty"} id={"44"} setBoard={setBoard} />
        <Space color={"empty"} id={"45"} setBoard={setBoard} />
        <Space color={"space--blue side--right"} id={"46"} setBoard={setBoard} />
      </div>
      <div className="row" id="row_5">
        <Space color={"space--red side--left"} id={"51"} setBoard={setBoard} />
        <Space color={"empty"} id={"52"} setBoard={setBoard} />
        <Space color={"empty"} id={"53"} setBoard={setBoard} />
        <Space color={"empty"} id={"54"} setBoard={setBoard} />
        <Space color={"empty"} id={"55"} setBoard={setBoard}/>
        <Space color={"space--blue side--right"} id={"56"} setBoard={setBoard} />
      </div>
      <div className="row" id="row_6">
        <div className="space empty space--empty highlight--none side--left bottom" />
        <Space color={"space--yellow bottom"} id={"62"} setBoard={setBoard} />
        <Space color={"space--yellow bottom"} id={"63"} setBoard={setBoard} />
        <Space color={"space--yellow bottom"} id={"64"} setBoard={setBoard} />
        <Space color={"space--yellow bottom"} id={"65"} setBoard={setBoard} />
        <div className="space empty space--empty highlight--none side--right bottom" />
      </div>
    </div>
  );
};