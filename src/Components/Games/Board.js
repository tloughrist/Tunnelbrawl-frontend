import React, { useState, useRef, createContext } from "react";
import Space from "./Space";
import {knightMoves, bishopMoves, rookMoves, queenMoves, kingMoves, pawnMoves} from "./LegalMoves.js";

export const BoardContext = createContext();

function Board({ game, board, setGames }) {

  const [boardArr, _setBoardArr] = useState(convert(board));
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
      movePiece(spaceId);
      return;
    } else if (spaceItself.contents.type === "empty") {
      clearHighlight();
      return;
    } else if (isHand(spaceId, game.turn) || isBoard(spaceId)) {
      showMoves(spaceId);
      return;
    } else {
      return;
    }
  };

  function showMoves(spaceId) {
    const spaceItself = boardStateRef.current.find(({loc}) => loc === spaceId);
    setActivePiece(spaceItself);
    const spaceItselfContents = spaceItself.contents;
    const pieceColor = spaceItselfContents.color;
    const pieceType = spaceItselfContents.type;
    let moves = "";
    if (isHand(spaceId, pieceColor)) {
      switch(pieceColor) {
        case "red":
          calcVacancies(boardStateRef.current, "red")
          moves = {piece: calcVacancies(boardStateRef.current, "red"), capture: []};
          break;
        case "green":
          calcVacancies(boardStateRef.current, "green")
          moves = {piece: calcVacancies(boardStateRef.current, "red"), capture: []};
          break;
        case "blue":
          calcVacancies(boardStateRef.current, "blue")
          moves = {piece: calcVacancies(boardStateRef.current, "red"), capture: []};
          break;
        case "yellow":
          calcVacancies(boardStateRef.current, "yellow")
          moves = {piece: calcVacancies(boardStateRef.current, "red"), capture: []};
          break;
        default:
          return;
      }
    } else if (isBoard(spaceId)) {
      switch(pieceType) {
        case "pawn":
          moves = pawnMoves(spaceId, boardStateRef.current, pieceColor);
          break;
        case "rook":
          moves = rookMoves(spaceId, boardStateRef.current, pieceColor);
          break;
        case "knight":
          moves = knightMoves(spaceId, boardStateRef.current, pieceColor);
          break;
        case "bishop":
          moves = bishopMoves(spaceId, boardStateRef.current, pieceColor);
          break;
        case "queen":
          moves = queenMoves(spaceId, boardStateRef.current, pieceColor);
          break;
        case "king":
          moves = kingMoves(spaceId, boardStateRef.current, pieceColor);
          break;
        default:
          return;
      }
    };
    clearHighlight();
    highlight(moves, spaceId);
  };

  function movePiece(spaceId) {
    clearHighlight();
    if ((activePieceRef.current.contents.color === game.turn) && (game.phase === "move")) {
      handleCapture(spaceId);
      replaceContents(activePieceRef.current.loc, {type: "empty", img: <div className="empty" onClick={handleClick} ></div>, highlight: "highlight--none"});
      replaceContents(spaceId, activePieceRef.current.contents);
      function undoMove() {
        replaceContents(spaceId, {type: "empty", img: <div className="empty" onClick={handleClick} ></div>, highlight: "highlight--none"});
        replaceContents(activePieceRef.current.loc, activePieceRef.current.contents);
      };
      confirmMove(undoMove);
    } else if ((game.phase === "place") && (isHand(activePieceRef.current.loc, game.turn))) {
      replaceContents(activePieceRef.current.loc, {type: "empty", img: <div className="empty" onClick={handleClick} ></div>, highlight: "highlight--none"});
      replaceContents(spaceId, activePieceRef.current.contents);
      function undoPlace() {
        replaceContents(spaceId, {type: "empty", img: <div className="empty" onClick={handleClick} ></div>, highlight: "highlight--none"});
        replaceContents(activePieceRef.current.loc, activePieceRef.current.contents);
      };
      confirmMove(undoPlace);
    } else {
      alert("Sorry, you cannot move that piece right now.");
    }
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
    //const boardState = boardStateRef.current;
    //const difference = boardState.map((el) => {
    //  const match = boardArr.find(({loc}) => loc === el.loc);
    //  el.contents.type !== match.contents.type;
    //});
    const res = await fetch(`/boards/${boardId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(unconvert(boardStateRef.current)),
      });
    if (res.ok) {
      const brd = await res.json();
      setBoardArr(convert(brd));
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

  //CAN BE IMPORTED
  function isHand(spaceId, color) {
    switch(color) {
      case "red":
        return spaceId > 100 && spaceId < 105;
      case "blue":
        return spaceId > 200 && spaceId < 205;
      case "green":
        return spaceId > 300 && spaceId < 305;
      case "yellow":
        return spaceId > 400 && spaceId < 405;
      default:
        return false;
    }
  };

  function isCamp(spaceId, color) {
    switch(color) {
      case "red":
        return spaceId < 100 && spaceId % 10 === 1;
      case "blue":
        return spaceId < 100 && spaceId % 10 === 6;
      case "green":
        return spaceId > 11 && spaceId < 16;
      case "yellow":
        return spaceId > 61 && spaceId < 66;
      default:
        return false;
    }
  };

  function isBoard(spaceId) {
    return spaceId > 11 && spaceId < 66
  };

  function calcVacancies(board, color) {
    const camp = board.filter(({loc}) => isCamp(parseInt(loc), color));
    const vacancies = camp.filter(({contents}) => contents.type === "empty");
    const vacArr = vacancies.map((vac) => parseInt(vac.loc));
    return vacArr;
  };

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

  function replaceContents(space, newContents) {
    const location = boardStateRef.current.find(({loc}) => loc === space);
    location.contents = newContents;
    const boardSans = boardStateRef.current.filter(({loc}) => loc !== space);
    setBoardArr([...boardSans, location]);
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
  
  function handleCapture(space) {
    const location = boardStateRef.current.find(({loc}) => loc === space);
    const isOpponent = (location.contents.color !== game.turn);
    if (isOpponent) {
      console.log("move piece to graveyard and update boardArr state");
    }
  };

  function pieceConvert(string) {
    switch(string){
      case "rp":
        return {color: "red", type: "pawn", img: <img className="red pawn" src="./pieces/red_pawn.png" alt="red pawn" onClick={handleClick} />, acro: "rp", highlight: "highlight--none"}
      case "gp":
        return {color: "green", type: "pawn", img: <img className="green pawn" src="./pieces/green_pawn.png" alt="green pawn" onClick={handleClick} />, acro: "gp", highlight: "highlight--none"}
      case "bp":
        return {color: "blue", type: "pawn", img: <img className="blue pawn" src="./pieces/blue_pawn.png" alt="blue pawn" onClick={handleClick} />, acro: "bp", highlight: "highlight--none"}
      case "yp":
        return {color: "yellow", type: "pawn", img: <img className="yellow pawn" src="./pieces/yellow_pawn.png" alt="yellow pawn" onClick={handleClick} />, acro: "yp",highlight: "highlight--none"}
      case "rr":
        return {color: "red", type: "rook", img: <img className="red rook" src="./pieces/red_rook.png" alt="red rook" onClick={handleClick} />, acro: "rr", highlight: "highlight--none"}
      case "gr":
        return {color: "green", type: "rook", img: <img className="green rook" src="./pieces/green_rook.png" alt="green rook" onClick={handleClick} />, acro: "gr", highlight: "highlight--none"}
      case "br":
        return {color: "blue", type: "rook", img: <img className="blue rook" src="./pieces/blue_rook.png" alt="blue rook" onClick={handleClick} />, acro: "br", highlight: "highlight--none"}
      case "yr":
        return {color: "yellow", type: "rook", img: <img className="yellow rook" src="./pieces/yellow_rook.png" alt="yellow rook" onClick={handleClick} />, acro: "yr", highlight: "highlight--none"}
      case "rn":
        return {color: "red", type: "knight", img: <img className="red knight" src="./pieces/red_knight.png" alt="red knight" onClick={handleClick} />, acro: "rn", highlight: "highlight--none"}
      case "gn":
        return {color: "green", type: "knight", img: <img className="green knight" src="./pieces/green_knight.png" alt="green knight" onClick={handleClick} />, acro: "gn", highlight: "highlight--none"}
      case "bn":
        return {color: "blue", type: "knight", img: <img className="blue knight" src="./pieces/blue_knight.png" alt="blue knight" onClick={handleClick} />, acro: "bn", highlight: "highlight--none"}
      case "yn":
        return {color: "yellow", type: "knight", img: <img className="yellow knight" src="./pieces/yellow_knight.png" alt="yellow knight" onClick={handleClick} />, acro: "yn", highlight: "highlight--none"}
      case "rb":
        return {color: "red", type: "bishop", img: <img className="red bishop" src="./pieces/red_bishop.png" alt="red bishop" onClick={handleClick} />, acro: "rb", highlight: "highlight--none"}
      case "gb":
        return {color: "green", type: "bishop", img: <img className="green bishop" src="./pieces/green_bishop.png" alt="green bishop" onClick={handleClick} />, acro: "gb", highlight: "highlight--none"}
      case "bb":
        return {color: "blue", type: "bishop", img: <img className="blue bishop" src="./pieces/blue_bishop.png" alt="blue bishop" onClick={handleClick} />, acro: "bb", highlight: "highlight--none"}
      case "yb":
        return {color: "yellow", type: "bishop", img: <img className="yellow bishop" src="./pieces/yellow_bishop.png" alt="yellow bishop" onClick={handleClick} />, acro: "yb", highlight: "highlight--none"}
      case "rq":
        return {color: "red", type: "queen", img: <img className="red queen" src="./pieces/red_queen.png" alt="red queen" onClick={handleClick} />, acro: "rq", highlight: "highlight--none"}
      case "gq":
        return {color: "green", type: "queen", img: <img className="green queen" src="./pieces/green_queen.png" alt="green queen" onClick={handleClick} />, acro: "gq", highlight: "highlight--none"}
      case "bq":
        return {color: "blue", type: "queen", img: <img className="blue queen" src="./pieces/blue_queen.png" alt="blue queen" onClick={handleClick} />, acro: "bq", highlight: "highlight--none"}
      case "yq":
        return {color: "yellow", type: "queen", img: <img className="yellow queen" src="./pieces/yellow_queen.png" alt="yellow queen" onClick={handleClick} />, acro: "yq", highlight: "highlight--none"}
      case "rk":
        return {color: "red", type: "king", img: <img className="red king" src="./pieces/red_king.png" alt="red king" onClick={handleClick} />, acro: "rk", highlight: "highlight--none"}
      case "gk":
        return {color: "green", type: "king", img: <img className="green king" src="./pieces/green_king.png" alt="green king" onClick={handleClick} />, acro: "gk", highlight: "highlight--none"}
      case "bk":
        return {color: "blue", type: "king", img: <img className="blue king" src="./pieces/blue_king.png" alt="blue king" onClick={handleClick} />, acro: "bk", highlight: "highlight--none"}
      case "yk":
        return {color: "yellow", type: "king", img: <img className="yellow king" src="./pieces/yellow_king.png" alt="yellow king" onClick={handleClick} />, acro: "yk", highlight: "highlight--none"}
      default:
        return {type: "empty", img: <div className="empty" onClick={handleClick} ></div>, highlight: "highlight--none"};
    }
  };
  
  function convert(boardObj) {
    const convertedBoard = [];
    Object.keys(boardObj).forEach((key) => {
      if (key.includes('loc')) {
        const numLoc = key.substring(3);
        const spaceObj = {loc: parseInt(numLoc), contents: pieceConvert(boardObj[key])};
        convertedBoard.push(spaceObj);
      }
    });
    return convertedBoard;
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
      const newGamePkg = pkgs.find((el) => el.game.id === game.id);
      setGames(pkgs);
      setBoardArr(convert(newGamePkg.board));
    } else {
      console.log(res.errors);
    }
  };
  
  function unconvert(boardArr) {
    const unconvertedBoard = {};
    const spaceObjs = boardArr.filter((obj) => Object.keys(obj).includes('loc'));
    const nonSpaceObjs = boardArr.filter((obj) => !Object.keys(obj).includes('loc'));
    spaceObjs.forEach((obj) => {
      const locKey = Object.keys(obj)[0];
      const contKey = Object.keys(obj)[1]
      const acroKey = Object.keys(obj[contKey])[3];
      const key = `loc${obj[locKey]}`;
      const contents = obj[contKey];
      let newValue = "";
      if (acroKey) {
        newValue = contents[acroKey];
      } else {
        newValue = null;
      }
      unconvertedBoard[key] = newValue;
    });
    nonSpaceObjs.forEach((obj) => {
      const key = Object.keys(obj)[0];
      const contents = obj[Object.keys(obj)[0]];
      unconvertedBoard[key] = contents;
    })
    return unconvertedBoard;
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
              <div className="space empty space--empty highlight--none" id={"01"}></div>
              <Space color={"space--green"} id={"12"} />
              <Space color={"space--green"} id={"13"} />
              <Space color={"space--green"} id={"14"} />
              <Space color={"space--green"} id={"15"} />
              <div className="space empty space--empty highlight--none" id={"02"}></div>
            </div>
            <div className="row" id="row_2">
              <Space color={"space--red"} id={"21"} />
              <Space color={"empty"} id={"22"} />
              <Space color={"empty"} id={"23"} />
              <Space color={"empty"} id={"24"} />
              <Space color={"empty"} id={"25"} />
              <Space color={"space--blue"} id={"26"} />
            </div>
            <div className="row" id="row_3">
              <Space color={"space--red"} id={"31"} />
              <Space color={"empty"} id={"32"} />
              <Space color={"empty"} id={"33"} />
              <Space color={"empty"} id={"34"} />
              <Space color={"empty"} id={"35"} />
              <Space color={"space--blue"} id={"36"} />
            </div>
            <div className="row" id="row_4">
              <Space color={"space--red"} id={"41"} />
              <Space color={"empty"} id={"42"} />
              <Space color={"empty"} id={"43"} />
              <Space color={"empty"} id={"44"} />
              <Space color={"empty"} id={"45"} />
              <Space color={"space--blue"} id={"46"} />
            </div>
            <div className="row" id="row_5">
              <Space color={"space--red"} id={"51"} />
              <Space color={"empty"} id={"52"} />
              <Space color={"empty"} id={"53"} />
              <Space color={"empty"} id={"54"} />
              <Space color={"empty"} id={"55"} />
              <Space color={"space--blue"} id={"56"} />
            </div>
            <div className="row" id="row_6">
              <div className="space empty space--empty highlight--none" id={"03"}></div>
              <Space color={"space--yellow"} id={"62"} />
              <Space color={"space--yellow"} id={"63"} />
              <Space color={"space--yellow"} id={"64"} />
              <Space color={"space--yellow"} id={"65"} />
              <div className="space empty space--empty highlight--none" id={"04"}></div>
            </div>
          </div>
          <div className="opponent_graveyard">

          </div>
        </div>
      </BoardContext.Provider>
  );
};

export default Board;