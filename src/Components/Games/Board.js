import React, { useState, useRef, createContext } from "react";
import Space from "./Space";
import showMoves from "./ShowMoves.js";
import movePiece from "./MovePiece.js";
import {convert, unconvert} from "./Converters.js";
import {isHand, isBoard} from "./Checkers.js";

export const BoardContext = createContext();

function Board({ game, board, setGames }) {

  const [boardArr, _setBoardArr] = useState(convert(board, handleClick));
  const [activePiece, _setActivePiece] = useState({});

  const boardStateRef = useRef(boardArr);
  const activePieceRef = useRef(activePiece);

  function setBoardArr(data) {
    _setBoardArr(data);
    boardStateRef.current = data;
  };

  function setActivePiece(data) {
    _setActivePiece(data);
    activePieceRef.current = data;
  };

  function handleClick(e) {
    const spaceId = parseInt(e.target.parentElement.id);
    const spaceItself = boardStateRef.current.find(({loc}) => loc === spaceId);
    if (spaceItself.contents.highlight === "highlight--yellow" || spaceItself.contents.highlight === "highlight--red") {
      movePiece(spaceId, clearHighlight, activePieceRef.current, game, handleClick, confirmMove, handleCapture, replaceContents);
      return;
    } else if (spaceItself.contents.type === "empty") {
      clearHighlight();
      return;
    } else if (isHand(spaceId, game.turn) || isBoard(spaceId)) {
      showMoves(boardStateRef.current, spaceId, clearHighlight, highlight, setActivePiece);
      return;
    } else {
      return;
    }
  };

  function handleCapture(space) {
    const location = boardStateRef.current.find(({loc}) => loc === space);
    const isOpponent = (location.contents.color !== game.turn);
    if (isOpponent) {
      console.log("move piece to graveyard and update boardArr state");
    }
  };

  function replaceContents(space, newContents) {
    const location = boardStateRef.current.find(({loc}) => loc === space);
    location.contents = newContents;
    const boardSans = boardStateRef.current.filter(({loc}) => loc !== space);
    setBoardArr([...boardSans, location]);
  };

  async function confirmMove(undo) {
    if (window.confirm("Confirm move?")) {
      await submitBoard(board.id);
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
    const newGameState = advance();
    const newGameStatus = calcGameStatus();
    newGameState.status = newGameStatus;
    const res = await fetch(`/games/${game.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(newGameState),
      });
    if (res.ok) {
      const pkgs = await res.json();
      setGames(pkgs);
    } else {
      console.log(res.errors);
    }
  };

  function advance() {
    if (game.phase === "move") {
      return {phase: "place"}
    } else {
      switch(game.no_players) {
        case 2: {
          switch(game.turn) {
            case "red":
              return {phase: "move", turn: "blue"};
            case "blue":
              return {phase: "move", turn: "red", round: game.round + 1};
            default:
              return;
          };
        };
        case 3: {
          switch(game.turn) {
            case "red":
              return {phase: "move", turn: "green"};
            case "green":
              return {phase: "move", turn: "blue"};
            case "blue":
              return {phase: "move", turn: "red", round: game.round + 1};
            default:
              return;
          };
        };
        case 4: {
          switch(game.turn) {
            case "red":
              return {phase: "move", turn: "green"};
            case "green":
              return {phase: "move", turn: "blue"};
            case "blue":
              return {phase: "move", turn: "yellow"};
            case "yellow":
              return {phase: "move", turn: "red", round: game.round + 1};
            default:
              return;
          };
        };
        default:
          return;
      }
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

  function handleDraw() {
    const hand = boardStateRef.current.filter(({loc}) => (loc === hand1 || loc === hand2 || loc === hand3 || loc === hand4));
    const emptyHand = hand.find((space) => space.contents.img.props.className === "empty");
    const deck = boardStateRef.current.filter(({loc}) => (loc === hand1 + 10 || loc === hand1 + 11 || loc === hand1 + 12 || loc === hand1 + 13 || loc === hand1 + 14 || loc === hand1 + 14 || loc === hand1 + 15 || loc === hand1 + 17));
    function draw() {
      let level = 0;
      while (level < 8) {
        if (deck[level] === null) {
          level += 1;
        } else {
          emptyHand.contents = deck[level].contents;
          deck[level] = null;
          break;
        }
      }
    };
    draw();
    const handSans = hand.filter(({loc}) => loc !== emptyHand.loc);
    const newHand = [...handSans, emptyHand];
    const replacements = [...newHand, ...deck]
    const boardSans = boardStateRef.current.filter(({loc}) => (loc < hand1 || loc > hand1 + 17));
    const newBoard = [...boardSans, ...replacements];
    setBoardArr(newBoard);
  };

  let hand1 = 101;
  let hand2 = 102;
  let hand3 = 103;
  let hand4 = 104;
  let handcolor = "red";
  
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
      const newGamePkg = pkgs.find((el) => el.game.id === game.id);
      setGames(pkgs);
      setBoardArr(convert(newGamePkg.board, handleClick));
    } else {
      console.log(res.errors);
    }
  };

  return (
      <BoardContext.Provider value={boardArr}>
        <div id="playing_field">
          <div className="buttons_container">
            {
              game.status === "pending" ?
                <button id="start_game" onClick={(e) => startGame(game.id)}>Start Game</button>
              : <button id="reset_game" onClick={(e) => resetGame(game.id)}>Reset Game</button>
            }
          </div>
          <div id="hand">
            <div className="row" id="row_0">
              <Space color={`space--${handcolor}`} id={hand1} />
              <Space color={`space--${handcolor}`} id={hand2} />
              <Space color={`space--${handcolor}`} id={hand3} />
              <Space color={`space--${handcolor}`} id={hand4} />
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