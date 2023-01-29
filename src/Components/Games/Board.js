import React from "react";

function Board() {
  return (
    <div className="board">
      <div className="row" id="row_1">
        <div className="space--empty space" id="01"></div>
        <div className="space space--green" id="12"></div>
        <div className="space space--green" id="13"></div>
        <div className="space space--green" id="14"></div>
        <div className="space space--green" id="15"></div>
        <div className="space--empty space" id="02"></div>
      </div>
      <div className="row" id="row_2">
        <div className="space space--red" id="21"></div>
        <div className="space" id="22"></div>
        <div className="space" id="23"></div>
        <div className="space" id="24"></div>
        <div className="space" id="25"></div>
        <div className="space space--blue" id="26"></div>
      </div>
      <div className="row" id="row_3">
        <div className="space space--red" id="31"></div>
        <div className="space" id="32"></div>
        <div className="space" id="33"></div>
        <div className="space" id="34"></div>
        <div className="space" id="35"></div>
        <div className="space space--blue" id="36"></div>
      </div>
      <div className="row" id="row_4">
        <div className="space space--red" id="41"></div>
        <div className="space" id="42"></div>
        <div className="space" id="43"></div>
        <div className="space" id="44"></div>
        <div className="space" id="45"></div>
        <div className="space space--blue" id="46"></div>
      </div>
      <div className="row" id="row_5">
        <div className="space space--red" id="51"></div>
        <div className="space" id="52"></div>
        <div className="space" id="53"></div>
        <div className="space" id="54"></div>
        <div className="space" id="55"></div>
        <div className="space space--blue" id="56"></div>
      </div>
      <div className="row" id="row_6">
        <div className="space--empty space" id="03"></div>
        <div className="space space--yellow" id="12"></div>
        <div className="space space--yellow" id="13"></div>
        <div className="space space--yellow" id="14"></div>
        <div className="space space--yellow" id="15"></div>
        <div className="space--empty space " id="04"></div>
      </div>
    </div>
  );
};

export default Board;