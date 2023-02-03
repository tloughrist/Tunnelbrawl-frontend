import React, { useState, useEffect, createContext } from "react";
import Space from "./Space";
import {knightMoves, bishopMoves, rookMoves, queenMoves, kingMoves, pawnMoves} from "./LegalMoves.js";

export const BoardContext = createContext();

function Board({ game, board, setGames }) {

  const empty = <div className="empty" onClick={clearHighlight} ></div>;
  const yellow_filter = <img className="filter--yellow" src="./pieces/yellow_filter.png" alt="yellow filter" onClick={movePiece} />;
  const red_filter = <img className="filter--red" src="./pieces/red_filter.png" alt="red filter" onClick={movePiece} />;
  const red_pawn = <img className="red pawn" src="./pieces/red_pawn.png" alt="red pawn" onClick={showMoves} />;
  const green_pawn = <img className="green pawn" src="./pieces/green_pawn.png" alt="green pawn" onClick={showMoves} />;
  const blue_pawn = <img className="blue pawn" src="./pieces/blue_pawn.png" alt="blue pawn" onClick={showMoves} />;
  const yellow_pawn = <img className="yellow pawn" src="./pieces/yellow_pawn.png" alt="yellow pawn" onClick={showMoves} />;
  const red_rook = <img className="red rook" src="./pieces/red_rook.png" alt="red rook" onClick={showMoves} />;
  const green_rook = <img className="green rook" src="./pieces/green_rook.png" alt="green rook" onClick={showMoves} />;
  const blue_rook = <img className="blue rook" src="./pieces/blue_rook.png" alt="blue rook" onClick={showMoves} />;
  const yellow_rook = <img className="yellow rook" src="./pieces/yellow_rook.png" alt="yellow rook" onClick={showMoves} />;
  const red_knight = <img className="red knight" src="./pieces/red_knight.png" alt="red knight" onClick={showMoves} />;
  const green_knight = <img className="green knight" src="./pieces/green_knight.png" alt="green knight" onClick={showMoves} />;
  const blue_knight = <img className="blue knight" src="./pieces/blue_knight.png" alt="blue knight" onClick={showMoves} />;
  const yellow_knight = <img className="yellow knight" src="./pieces/yellow_knight.png" alt="yellow knight" onClick={showMoves} />;
  const red_bishop = <img className="red bishop" src="./pieces/red_bishop.png" alt="red bishop" onClick={showMoves} />;
  const green_bishop = <img className="green bishop" src="./pieces/green_bishop.png" alt="green bishop" onClick={showMoves} />;
  const blue_bishop = <img className="blue bishop" src="./pieces/blue_bishop.png" alt="blue bishop" onClick={showMoves} />;
  const yellow_bishop = <img className="yellow bishop" src="./pieces/yellow_bishop.png" alt="yellow bishop" onClick={showMoves} />;
  const red_queen = <img className="red queen" src="./pieces/red_queen.png" alt="red queen" onClick={showMoves} />;
  const green_queen = <img className="green queen" src="./pieces/green_queen.png" alt="green queen" onClick={showMoves} />;
  const blue_queen = <img className="blue queen" src="./pieces/blue_queen.png" alt="blue queen" onClick={showMoves} />;
  const yellow_queen = <img className="yellow queen" src="./pieces/yellow_queen.png" alt="yellow queen" onClick={showMoves} />;
  const red_king = <img className="red king" src="./pieces/red_king.png" alt="red king" onClick={showMoves} />;
  const green_king = <img className="green king" src="./pieces/green_king.png" alt="green king" onClick={showMoves} />;
  const blue_king = <img className="blue king" src="./pieces/blue_king.png" alt="blue king" onClick={showMoves} />;
  const yellow_king = <img className="yellow king" src="./pieces/yellow_king.png" alt="yellow king" onClick={showMoves} />;

  const [boardArr, setBoardArr] = useState(convert(board));
  const [isLoaded, setIsLoaded] = useState(true);
  const [turn, setTurn] = useState("");
  const [moved, setMoved] = useState(false);
  const [yellowHighlights, setYellowHighlights] = useState([]);
  const [redHighlights, setRedHighlights] = useState([]);

  let activePiece = "";
  let hand1 = 101;
  let hand2 = 102;
  let hand3 = 103;
  let hand4 = 104;
  let handcolor = "red";

  /* useEffect(() => {
    if (game) {
      initialState()
    }
  }, [game]);

  function initialState() {
    setBoardArr(convert(board));
    setIsLoaded(true);
    setMoved(false);
    handleHand(game);
  }; */

  function showMoves(e) {
    const spaceId = parseInt(e.target.parentElement.id);
    const pieceColor = boardArr.find(({loc}) => loc === spaceId).contents.color;
    const pieceType = boardArr.find(({loc}) => loc === spaceId).contents.type;
    activePiece = boardArr.find(({loc}) => loc === spaceId);
    let moves = "";
    if (isHand(spaceId, pieceColor)) {
      switch(pieceColor) {
        case "red":
          calcVacancies(boardArr, "red")
          moves = {piece: calcVacancies(boardArr, "red"), capture: []};
          break;
        case "green":
          calcVacancies(boardArr, "green")
          moves = {piece: calcVacancies(boardArr, "red"), capture: []};
          break;
        case "blue":
          calcVacancies(boardArr, "blue")
          moves = {piece: calcVacancies(boardArr, "red"), capture: []};
          break;
        case "yellow":
          calcVacancies(boardArr, "yellow")
          moves = {piece: calcVacancies(boardArr, "red"), capture: []};
          break;
        default:
          return;
      }
    } else if (isBoard(spaceId)) {
      switch(pieceType) {
        case "pawn":
          moves = pawnMoves(spaceId, boardArr, pieceColor);
          break;
        case "rook":
          moves = rookMoves(spaceId, boardArr, pieceColor);
          break;
        case "knight":
          moves = knightMoves(spaceId, boardArr, pieceColor);
          break;
        case "bishop":
          moves = bishopMoves(spaceId, boardArr, pieceColor);
          break;
        case "queen":
          moves = queenMoves(spaceId, boardArr, pieceColor);
          break;
        case "king":
          moves = kingMoves(spaceId, boardArr, pieceColor);
          break;
        default:
          return;
      }
    };
    clearHighlight();
    highlight(moves);
  };

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
    const clearBoard = boardArr.map((space) => {
      return {...space, contents: {...space.contents, highlight: "highlight--none"}}
    })
    setBoardArr(clearBoard);
  };

  function highlight({piece, capture}) {
    const yellowBoard = boardArr.filter(({loc}) => piece.includes(loc));
    const redBoard = boardArr.filter(({loc}) => capture.includes(loc));
    const yellowLit = yellowBoard.map((space) => {
      return {...space, contents: {...space.contents, highlight: "highlight--yellow"}}
    });
    const redLit = redBoard.map((space) => {
      return {...space, contents: {...space.contents, highlight: "highlight--red"}}
    });
    const boardArrSansYellow = boardArr.filter(({loc}) => !piece.includes(loc));
    const boardArrSansYellowRed = boardArrSansYellow.filter(({loc}) => !capture.includes(loc));
    setBoardArr([...boardArrSansYellowRed, ...redLit, ...yellowLit]);
  };

  useEffect(() => {
    if (moved) {
      if (window.confirm("Confirm move?")) {
        if (game.phase === "place") {
          handleDraw();
        }
        submitBoard(unconvert(boardArr));
      } else {
        //populateBoard();
      }
    }
  }, [moved]);

  function handleDraw() {
    const hand = boardArr.filter(({loc}) => (loc === hand1 || loc === hand2 || loc === hand3 || loc === hand4));
    const emptyHand = hand.find((space) => space.contents.img.props.className === "empty");
    const deck = boardArr.filter(({loc}) => (loc === hand1 + 10 || loc === hand1 + 11 || loc === hand1 + 12 || loc === hand1 + 13 || loc === hand1 + 14 || loc === hand1 + 14 || loc === hand1 + 15 || loc === hand1 + 17));
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
    const boardSans = boardArr.filter(({loc}) => (loc < hand1 || loc > hand1 + 17));
    const newBoard = [...boardSans, ...replacements];
    setBoardArr(newBoard);
  };

  function handleHand(game) {
    switch(game.turn) {
      case "red":
        handcolor = "red";
        hand1 = 101;
        hand2 = 102;
        hand3 = 103;
        hand4 = 104;
        break;
      case "green":
        handcolor = "green"
        hand1 = 201;
        hand2 = 202;
        hand3 = 203;
        hand4 = 204;
        break;
      case "blue":
        handcolor = "blue"
        hand1 = 301;
        hand2 = 302;
        hand3 = 303;
        hand4 = 304;
        break;
      case "yellow":
        handcolor = "yellow"
        hand1 = 401;
        hand2 = 402;
        hand3 = 403;
        hand4 = 404;
        break;
      default:
        return;
    }
  };

  function populateBoard() {
    setBoardArr(convert(board));
  }  

  function tempBoard(moves, board) {
    let boardHolder = board
    if (moves.piece.length > 0) {
      moves.piece.map((move) => {
        const spaceObj = boardHolder.find(({loc}) => loc === move);
        spaceObj.contents = {img: yellow_filter};
        const boardSans = boardHolder.filter((obj) => obj.loc !== move);
        const newBoard = [...boardSans, spaceObj];
        return boardHolder = newBoard;
      });
    }
    if (moves.capture.length > 0) {
      moves.capture.map((move) => {
        const spaceObj = boardHolder.find(({loc}) => loc === move);
        spaceObj.contents = {img: red_filter};
        const boardSans = boardHolder.filter((obj) => obj.loc !== move);
        const newBoard = [...boardSans, spaceObj];
        return boardHolder = newBoard;
      });
    }
    return boardHolder;
  };

  function movePiece(e) {
    if ((activePiece.contents.color === game.turn) && (game.phase === "move")) {
      //populateBoard();
      const space = parseInt(e.target.parentNode.id);
      const convertedBoard = convert(board);
      handleCapture(space, convertedBoard);
      replaceContents(convertedBoard, activePiece.loc, {img: empty});
      replaceContents(convertedBoard, space, activePiece.contents)
      setMoved(true);
    } else if ((game.phase === "place") && (activePiece.loc === hand1 || activePiece.loc === hand2 || activePiece.loc === hand3 || activePiece.loc === hand4)) {
      //populateBoard();
      const space = parseInt(e.target.parentNode.id);
      const convertedBoard = convert(board);
      replaceContents(convertedBoard, activePiece.loc, {img: empty});
      replaceContents(convertedBoard, space, activePiece.contents)
      setMoved(true);
    } else {
      alert("Sorry, you cannot move that piece right now.");
    }
  };

  function replaceContents(board, space, newContents) {
    const location = board.find(({loc}) => loc === space);
    location.contents = newContents;
    const boardSans = board.filter(({loc}) => loc !== space);
    setBoardArr([...boardSans, location]);
  }

  function handleCapture(space, board) {
    const location = board.find(({loc}) => loc === space);
    const isOpponent = (location.contents.color !== game.turn);
    if (isOpponent) {
      console.log("move piece to graveyard and update boardArr state");
    }
  };

  async function submitBoard(board) {
    const res = await fetch(`/boards/${board.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(board),
      });
    if (res.ok) {
      const brd = await res.json();
      setBoardArr(convert(brd));
      submitGame(game, convert(brd));
    } else {
      console.log(res.errors);
    }
  };

  async function submitGame(game, board) {
    const newGameState = calcGameState(game);
    const newGameStatus = calcGameStatus(board);
    newGameState.status = newGameStatus;
    const res = await fetch(`/games/${game.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(newGameState),
      });
    if (res.ok) {
      const pkg = await res.json();
      setGames(pkg);
    } else {
      console.log(res.errors);
    }
  };

  function calcGameState(game) {
    const noPlayers = game.no_players
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
      };
    };
  };

  function calcGameStatus(board) {
    return "in progress";
  }

  function pieceConvert(string) {
    switch(string){
      case "rp":
        return {color: "red", type: "pawn", img: red_pawn, acro: "rp", highlight: "highlight--none"}
      case "gp":
        return {color: "green", type: "pawn", img: green_pawn, acro: "gp", highlight: "highlight--none"}
      case "bp":
        return {color: "blue", type: "pawn", img: blue_pawn, acro: "bp", highlight: "highlight--none"}
      case "yp":
        return {color: "yellow", type: "pawn", img: yellow_pawn, acro: "yp",highlight: "highlight--none"}
      case "rr":
        return {color: "red", type: "rook", img: red_rook, acro: "rr", highlight: "highlight--none"}
      case "gr":
        return {color: "green", type: "rook", img: green_rook, acro: "gr", highlight: "highlight--none"}
      case "br":
        return {color: "blue", type: "rook", img: blue_rook, acro: "br", highlight: "highlight--none"}
      case "yr":
        return {color: "yellow", type: "rook", img: yellow_rook, acro: "yr", highlight: "highlight--none"}
      case "rn":
        return {color: "red", type: "knight", img: red_knight, acro: "rn", highlight: "highlight--none"}
      case "gn":
        return {color: "green", type: "knight", img: green_knight, acro: "gn", highlight: "highlight--none"}
      case "bn":
        return {color: "blue", type: "knight", img: blue_knight, acro: "bn", highlight: "highlight--none"}
      case "yn":
        return {color: "yellow", type: "knight", img: yellow_knight, acro: "yn", highlight: "highlight--none"}
      case "rb":
        return {color: "red", type: "bishop", img: red_bishop, acro: "rb", highlight: "highlight--none"}
      case "gb":
        return {color: "green", type: "bishop", img: green_bishop, acro: "gb", highlight: "highlight--none"}
      case "bb":
        return {color: "blue", type: "bishop", img: blue_bishop, acro: "bb", highlight: "highlight--none"}
      case "yb":
        return {color: "yellow", type: "bishop", img: yellow_bishop, acro: "yb", highlight: "highlight--none"}
      case "rq":
        return {color: "red", type: "queen", img: red_queen, acro: "rq", highlight: "highlight--none"}
      case "gq":
        return {color: "green", type: "queen", img: green_queen, acro: "gq", highlight: "highlight--none"}
      case "bq":
        return {color: "blue", type: "queen", img: blue_queen, acro: "bq", highlight: "highlight--none"}
      case "yq":
        return {color: "yellow", type: "queen", img: yellow_queen, acro: "yq", highlight: "highlight--none"}
      case "rk":
        return {color: "red", type: "king", img: red_king, acro: "rk", highlight: "highlight--none"}
      case "gk":
        return {color: "green", type: "king", img: green_king, acro: "gk", highlight: "highlight--none"}
      case "bk":
        return {color: "blue", type: "king", img: blue_king, acro: "bk", highlight: "highlight--none"}
      case "yk":
        return {color: "yellow", type: "king", img: yellow_king, acro: "yk", highlight: "highlight--none"}
      default:
        return {type: "empty", img: empty, highlight: "highlight--none"};
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
      setIsLoaded(false);
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