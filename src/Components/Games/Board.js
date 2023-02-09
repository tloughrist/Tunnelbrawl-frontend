import React, { useState, useRef, createContext } from "react";
import Space from "./Space";
import showMoves from "./ShowMoves.js";
import movePiece from "./MovePiece.js";
import {convert, unconvert} from "./Helpers/Converters.js";
import {isHand, isBoard, isDeck, handSpaces, deckSpaces, campSpaces, isLocked} from "./Helpers/Checkers.js";
import {deal} from "./Dealers.js";
import advance from "./Helpers/Advance.js";

export const BoardContext = createContext();

function Board({ gameInit, boardInit, setGames }) {

  const [boardArr, _setBoardArr] = useState(convert(boardInit, handleClick));
  const [activePiece, _setActivePiece] = useState({});
  const [game, _setGame] = useState(gameInit);

  const boardStateRef = useRef(boardArr);
  const activePieceRef = useRef(activePiece);
  const gameRef = useRef(game);

  function setBoardArr(data) {
    _setBoardArr(data);
    boardStateRef.current = data;
  };

  function setActivePiece(data) {
    _setActivePiece(data);
    activePieceRef.current = data;
  };

  function setGame(data) {
    _setGame(data);
    gameRef.current = data;
  };

  function handleClick(e) {
    const spaceId = parseInt(e.target.parentElement.id);
    const spaceItself = boardStateRef.current.find(({loc}) => loc === spaceId);
    if (spaceItself.contents.highlight === "highlight--yellow" || spaceItself.contents.highlight === "highlight--red") {
      movePiece(spaceId, clearHighlight, activePieceRef.current, gameRef.current, handleClick, confirmMove, handleCapture, replaceContents, boardStateRef.current);
      return;
    } else if (spaceItself.contents.type === "empty") {
      clearHighlight();
      return;
    } else if (isHand(spaceId, gameRef.current.turn) || isBoard(spaceId)) {
      showMoves(boardStateRef.current, spaceId, clearHighlight, highlight, setActivePiece);
      return;
    } else {
      return;
    }
  };

  function handleCapture(space) {
    const location = boardStateRef.current.find(({loc}) => loc === space);
    const isOpponent = (location.contents.color !== gameRef.current.turn);
    if (isOpponent) {
      console.log("move piece to graveyard and update boardArr state");
    }
  };

  function replaceContents(space, newContents) {
    const location = boardStateRef.current.find(({loc}) => loc === space);
    location.contents = newContents;
    const boardSans = boardStateRef.current.filter(({loc}) => loc !== space);
    console.log(space)
    console.log([location])
    setBoardArr([...boardSans, location]);
  };

  async function confirmMove(undo) {
    if (window.confirm("Confirm move?")) {
      await submitBoard(boardInit.id);
      await submitGame();
    } else {
      clearHighlight();
      undo();
    }
  };

  async function submitBoard(boardId) {
    const res = await fetch(`/boards/${boardId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(unconvert(boardStateRef.current)),
      });
    if (res.ok) {
      const brd = await res.json();
      setBoardArr(convert(brd, handleClick));
    } else {
      console.log(res.errors);
    }
  };

  async function submitGame() {
    const newGameState = advance(boardStateRef.current , gameRef.current);
    const newGameStatus = calcGameStatus();
    newGameState.status = newGameStatus;
    const res = await fetch(`/games/${gameRef.current.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(newGameState),
      });
    if (res.ok) {
      const pkgs = await res.json();
      setGames(pkgs);
      const newGamePkg = pkgs.find(({game_id}) => game_id = gameRef.current.id);
      const currentColor = gameRef.current.turn;
      setGame(newGamePkg.game);
      setBoardArr(convert(newGamePkg.board, handleClick));
      if (isLocked(gameRef.current.turn, boardStateRef.current)) {
        alert(`${gameRef.current.turn} is locked. Turn is forfeited.`);
        submitGame();
      } else if (newGameState.phase === "move") {
        handleDraw(boardStateRef.current, currentColor, setBoardArr);
      }
    } else {
      console.log(res.errors);
    }
  };

  function calcGameStatus() {
    //when there are x kings in graveyards...
    return "in progress";
  }

  function clearHighlight() {
    const clearBoard = boardStateRef.current.map((space) => {
      return {...space, contents: {...space.contents, highlight: "highlight--none"}}
    })
    setBoardArr(clearBoard);
  };

  function highlight({piece, capture}, active) {
    const yellowBoard = boardStateRef.current.filter(({loc}) => piece.includes(loc));
    const redBoard = boardStateRef.current.filter(({loc}) => capture.includes(loc));
    const activeBoard = boardStateRef.current.find(({loc}) => loc === active);
    const yellowLit = yellowBoard.map((space) => {
      return {...space, contents: {...space.contents, highlight: "highlight--yellow"}}
    });
    const redLit = redBoard.map((space) => {
      return {...space, contents: {...space.contents, highlight: "highlight--red"}}
    });
    const activeLit = {...activeBoard, contents: {...activeBoard.contents, highlight: "highlight--active"}};
    const boardArrSansYellow = boardStateRef.current.filter(({loc}) => !piece.includes(loc));
    const boardArrSansYellowRed = boardArrSansYellow.filter(({loc}) => !capture.includes(loc));
    const boardArrSansAll = boardArrSansYellowRed.filter(({loc}) => loc !== active);
    setBoardArr([...boardArrSansAll, ...redLit, ...yellowLit, activeLit]);
  };

  function handleDraw(boardState, color, setBoard) {
    const hand = deal(boardState, color, isHand);
    console.log(hand)
    const emptyHand = hand.find((space) => space.contents.type === "empty");
    const deck = deal(boardState, color, isDeck);
    function draw() {
      let level = 0;
      while (level < 8) {
        if (deck[level].contents.type === "empty") {
          level += 1;
        } else {
          console.log(emptyHand)
          emptyHand.contents = deck[level].contents;
          deck[level].contents = {type: "empty"};
          break;
        }
      }
    };
    draw();
    const handSans = hand.filter(({loc}) => loc !== emptyHand.loc);
    const newHand = [...handSans, emptyHand];
    const replacements = [...newHand, ...deck]
    const boardSans = boardStateRef.current.filter(({loc}) => {
      const replaceLocs = replacements.map((card) => card.loc);
      return !replaceLocs.includes(loc);
    });
    const newBoard = [...boardSans, ...replacements];
    setBoard(newBoard);
  };
  
  async function startGame(gameId) {
    const res = await fetch(`/games/initialize/${gameId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({status: "active"}),
    });
    if (res.ok) {
      const pkg = await res.json();
      setGames(pkg);
    } else {
      console.log(res.errors);
    }
  };

  async function resetGame(gameId) {
    const res = await fetch(`/games/initialize/${gameId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({turn: "red", phase: "move", round: 1}),
    });
    if (res.ok) {
      const pkgs = await res.json();
      const newGamePkg = pkgs.find((el) => el.game.id === gameId);
      setGames(pkgs);
      setBoardArr(convert(newGamePkg.board, handleClick));
    } else {
      console.log(res.errors);
    }
  };

  return (
      <BoardContext.Provider value={boardStateRef.current}>
        <div id="playing_field">
          <div className="buttons_container">
            {
              gameRef.current.status === "pending" ?
                <button id="start_game" onClick={(e) => startGame(gameRef.current.id)}>Start Game</button>
              : <button id="reset_game" onClick={(e) => resetGame(gameRef.current.id)}>Reset Game</button>
            }
          </div>
          <div id="hand">
            <div className="row" id="row_0">
              <Space color={`space--${gameRef.current.turn}`} id={handSpaces(gameRef.current.turn)[0]} />
              <Space color={`space--${gameRef.current.turn}`} id={handSpaces(gameRef.current.turn)[1]} />
              <Space color={`space--${gameRef.current.turn}`} id={handSpaces(gameRef.current.turn)[2]} />
              <Space color={`space--${gameRef.current.turn}`} id={handSpaces(gameRef.current.turn)[3]} />
            </div>
          </div>
          <div className="player_graveyard">

          </div> 
          <div className="board"> 
            <div className="row" id="row_1">
              <div className="space empty space--empty highlight--none side--left top" id="01" ></div>
              <Space color={"space--green top"} id={"12"} />
              <Space color={"space--green top"} id={"13"} />
              <Space color={"space--green top"} id={"14"} />
              <Space color={"space--green top"} id={"15"} />
              <div className="space empty space--empty highlight--none side--right top" id="02" ></div>
            </div>
            <div className="row" id="row_2">
              <Space color={"space--red side--left"} id={"21"} />
              <Space color={"empty"} id={"22"} />
              <Space color={"empty"} id={"23"} />
              <Space color={"empty"} id={"24"} />
              <Space color={"empty"} id={"25"} />
              <Space color={"space--blue side--right"} id={"26"} />
            </div>
            <div className="row" id="row_3">
              <Space color={"space--red side--left"} id={"31"} />
              <Space color={"empty"} id={"32"} />
              <Space color={"empty"} id={"33"} />
              <Space color={"empty"} id={"34"} />
              <Space color={"empty"} id={"35"} />
              <Space color={"space--blue side--right"} id={"36"} />
            </div>
            <div className="row" id="row_4">
              <Space color={"space--red side--left"} id={"41"} />
              <Space color={"empty"} id={"42"} />
              <Space color={"empty"} id={"43"} />
              <Space color={"empty"} id={"44"} />
              <Space color={"empty"} id={"45"} />
              <Space color={"space--blue side--right"} id={"46"} />
            </div>
            <div className="row" id="row_5">
              <Space color={"space--red side--left"} id={"51"} />
              <Space color={"empty"} id={"52"} />
              <Space color={"empty"} id={"53"} />
              <Space color={"empty"} id={"54"} />
              <Space color={"empty"} id={"55"} />
              <Space color={"space--blue side--right"} id={"56"} />
            </div>
            <div className="row" id="row_6">
              <div className="space empty space--empty highlight--none side--left bottom" id= "03" ></div>
              <Space color={"space--yellow bottom"} id={"62"} />
              <Space color={"space--yellow bottom"} id={"63"} />
              <Space color={"space--yellow bottom"} id={"64"} />
              <Space color={"space--yellow bottom"} id={"65"} />
              <div className="space empty space--empty highlight--none side--right bottom" id= "04" ></div>
            </div>
          </div>
          <div className="opponent_graveyard">

          </div>
        </div>
      </BoardContext.Provider>
  );
};

export default Board;