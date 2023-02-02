import React, { useState, useEffect } from "react";
import Space from "./Space";
import {knightMoves, bishopMoves, rookMoves, queenMoves, kingMoves, pawnMoves} from "./LegalMoves.js";

function Board({ game, games, setGames }) {

  const empty = <div className="empty" onClick={populateBoard} ></div>;
  const yellow_filter = <img className="filter--yellow" src="./pieces/yellow_filter.png" alt="yellow filter" onClick={(e) => movePiece(e)} />;
  const red_filter = <img className="filter--red" src="./pieces/red_filter.png" alt="red filter" onClick={(e) => movePiece(e)} />;
  const red_pawn = <img className="red pawn" src="./pieces/red_pawn.png" alt="red pawn" onClick={(e) => showMoves(e)} />;
  const green_pawn = <img className="green pawn" src="./pieces/green_pawn.png" alt="green pawn" onClick={(e) => showMoves(e)} />;
  const blue_pawn = <img className="blue pawn" src="./pieces/blue_pawn.png" alt="blue pawn" onClick={(e) => showMoves(e)} />;
  const yellow_pawn = <img className="yellow pawn" src="./pieces/yellow_pawn.png" alt="yellow pawn" onClick={(e) => showMoves(e)} />;
  const red_rook = <img className="red rook" src="./pieces/red_rook.png" alt="red rook" onClick={(e) => showMoves(e)} />;
  const green_rook = <img className="green rook" src="./pieces/green_rook.png" alt="green rook" onClick={(e) => showMoves(e)} />;
  const blue_rook = <img className="blue rook" src="./pieces/blue_rook.png" alt="blue rook" onClick={(e) => showMoves(e)} />;
  const yellow_rook = <img className="yellow rook" src="./pieces/yellow_rook.png" alt="yellow rook" onClick={(e) => showMoves(e)} />;
  const red_knight = <img className="red knight" src="./pieces/red_knight.png" alt="red knight" onClick={(e) => showMoves(e)} />;
  const green_knight = <img className="green knight" src="./pieces/green_knight.png" alt="green knight" onClick={(e) => showMoves(e)} />;
  const blue_knight = <img className="blue knight" src="./pieces/blue_knight.png" alt="blue knight" onClick={(e) => showMoves(e)} />;
  const yellow_knight = <img className="yellow knight" src="./pieces/yellow_knight.png" alt="yellow knight" onClick={(e) => showMoves(e)} />;
  const red_bishop = <img className="red bishop" src="./pieces/red_bishop.png" alt="red bishop" onClick={(e) => showMoves(e)} />;
  const green_bishop = <img className="green bishop" src="./pieces/green_bishop.png" alt="green bishop" onClick={(e) => showMoves(e)} />;
  const blue_bishop = <img className="blue bishop" src="./pieces/blue_bishop.png" alt="blue bishop" onClick={(e) => showMoves(e)} />;
  const yellow_bishop = <img className="yellow bishop" src="./pieces/yellow_bishop.png" alt="yellow bishop" onClick={(e) => showMoves(e)} />;
  const red_queen = <img className="red queen" src="./pieces/red_queen.png" alt="red queen" onClick={(e) => showMoves(e)} />;
  const green_queen = <img className="green queen" src="./pieces/green_queen.png" alt="green queen" onClick={(e) => showMoves(e)} />;
  const blue_queen = <img className="blue queen" src="./pieces/blue_queen.png" alt="blue queen" onClick={(e) => showMoves(e)} />;
  const yellow_queen = <img className="yellow queen" src="./pieces/yellow_queen.png" alt="yellow queen" onClick={(e) => showMoves(e)} />;
  const red_king = <img className="red king" src="./pieces/red_king.png" alt="red king" onClick={(e) => showMoves(e)} />;
  const green_king = <img className="green king" src="./pieces/green_king.png" alt="green king" onClick={(e) => showMoves(e)} />;
  const blue_king = <img className="blue king" src="./pieces/blue_king.png" alt="blue king" onClick={(e) => showMoves(e)} />;
  const yellow_king = <img className="yellow king" src="./pieces/yellow_king.png" alt="yellow king" onClick={(e) => showMoves(e)} />;

  const [loc12, setLoc12] = useState(empty);
  const [loc13, setLoc13] = useState(empty);
  const [loc14, setLoc14] = useState(empty);
  const [loc15, setLoc15] = useState(empty);
  const [loc21, setLoc21] = useState(empty);
  const [loc22, setLoc22] = useState(empty);
  const [loc23, setLoc23] = useState(empty);
  const [loc24, setLoc24] = useState(empty);
  const [loc25, setLoc25] = useState(empty);
  const [loc26, setLoc26] = useState(empty);
  const [loc31, setLoc31] = useState(empty);
  const [loc32, setLoc32] = useState(empty);
  const [loc33, setLoc33] = useState(empty);
  const [loc34, setLoc34] = useState(empty);
  const [loc35, setLoc35] = useState(empty);
  const [loc36, setLoc36] = useState(empty);
  const [loc41, setLoc41] = useState(empty);
  const [loc42, setLoc42] = useState(empty);
  const [loc43, setLoc43] = useState(empty);
  const [loc44, setLoc44] = useState(empty);
  const [loc45, setLoc45] = useState(empty);
  const [loc46, setLoc46] = useState(empty);
  const [loc51, setLoc51] = useState(empty);
  const [loc52, setLoc52] = useState(empty);
  const [loc53, setLoc53] = useState(empty);
  const [loc54, setLoc54] = useState(empty);
  const [loc55, setLoc55] = useState(empty);
  const [loc56, setLoc56] = useState(empty);
  const [loc62, setLoc62] = useState(empty);
  const [loc63, setLoc63] = useState(empty);
  const [loc64, setLoc64] = useState(empty);
  const [loc65, setLoc65] = useState(empty);
  const [previousBoardObj, setPreviousBoardObj] = useState();

  let activePiece = "";

  const squares = [loc12, loc13, loc14, loc15, loc21, loc22, loc23, loc24, loc25, loc26, loc31, loc32, loc33, loc34, loc35, loc36, loc41, loc42, loc43, loc44, loc45, loc46, loc51, loc52, loc53, loc54, loc55, loc56, loc62, loc63, loc64, loc65];

  const setSquares = [setLoc12, setLoc13, setLoc14, setLoc15, setLoc21, setLoc22, setLoc23, setLoc24, setLoc25, setLoc26, setLoc31, setLoc32, setLoc33, setLoc34, setLoc35, setLoc36, setLoc41, setLoc42, setLoc43, setLoc44, setLoc45, setLoc46, setLoc51, setLoc52, setLoc53, setLoc54, setLoc55, setLoc56, setLoc62, setLoc63, setLoc64, setLoc65];

  useEffect(() => {
    if (game) {
      setPreviousBoardObj(game.board)
    }
  }, [game]);

  useEffect(() => {
    if (previousBoardObj) {
      populateBoard(previousBoardObj);
    }
  }, [previousBoardObj]);

  function populateBoard() {
    const allKeys = Object.keys(previousBoardObj);
    const spaces = allKeys.filter((key) => key.includes("loc"));
    spaces.map((space) =>  {
      const normalizedSpace = parseInt(space.substring(3));
      const occ = previousBoardObj[space];
      const piece = convertPiece(occ);
      stateSelector(normalizedSpace, piece);
    })
  };

  function showMoves(e) {
    const color = e.target.classList[0];
    const type = e.target.classList[1];
    const space = parseInt(e.target.parentNode.id);
    handleActivePiece(color, type, space);
    let moves = "";
    switch(type) {
      case "pawn":
        moves = pawnMoves(space, previousBoardObj, color);
        break;
      case "rook":
        moves = rookMoves(space, previousBoardObj, color);
        break;
      case "knight":
        moves = knightMoves(space, previousBoardObj, color);
        break;
      case "bishop":
        moves = bishopMoves(space, previousBoardObj, color);
        break;
      case "queen":
        moves = queenMoves(space, previousBoardObj, color);
        break;
      case "king":
        moves = kingMoves(space, previousBoardObj, color);
        break;
    };
    populateBoard();
    if (moves.piece.length > 0) {
      moves.piece.map((move) => stateSelector(move, yellow_filter));
    }
    if (moves.capture.length > 0) {
      moves.capture.map((move) => stateSelector(move, red_filter));
    }
  };

  function movePiece(e) {
    if ((activePiece.color === game.turn) && (game.phase === "move")) {
      populateBoard();
      const space = parseInt(e.target.parentNode.id);
      handleCapture(space);
      stateSelector(space, activePiece.image);
      stateSelector(activePiece.original, empty);
      confirmMove(activePiece.original, space, activePiece.piece);
    } else {
      alert("Sorry, you cannot move that piece right now.");
    }
  };

  function handleActivePiece(color, type, location) {
    const colorLetter = color.charAt(0);
    const typeLetter = type === "knight" ? "n" : type.charAt(0);
    const acronym = `${colorLetter}${typeLetter}`;
    activePiece = {color: color, piece: acronym, image: convertPiece(acronym), original: location};
  };

  function handleCapture(space) {
  }

  function confirmMove(startLoc, finishLoc, piece) {
    if (window.confirm("Confirm move?")) {
      console.log(previousBoardObj)
      const formatStartLoc = `loc${startLoc}`;
      const formatFinishLoc = `loc${finishLoc}`;
      const newBoard = previousBoardObj;
      newBoard[formatStartLoc] = null;
      newBoard[formatFinishLoc] = piece;
      //game.phase = "place";
      console.log(newBoard)
      //submitBoard(newBoard);
      //submitGame(game);
    } else {
      populateBoard();
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
      setPreviousBoardObj(brd);
    } else {
      alert(res.errors);
    }
  };

  async function submitGame(game) {
    const res = await fetch(`/games/${game.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        round: game.round,
        turn: game.turn,
        phase: game.phase,
        status: game.status
      }),
      });
    if (res.ok) {
      const gme = await res.json();
      const gamesSans = games.filter((el) => el.id !== gme.id);
      setGames([...gamesSans, gme]);
    } else {
      alert(res.errors);
    }
  };

  function stateSelector(spaceId, content) {
    switch(spaceId) {
      case 12:
        return setLoc12(content);
      case 13:
        return setLoc13(content);
      case 14:
        return setLoc14(content);
      case 15:
        return setLoc15(content);
      case 21:
        return setLoc21(content);
      case 22:
        return setLoc22(content);
      case 23:
        return setLoc23(content);
      case 24:
        return setLoc24(content);
      case 25:
        return setLoc25(content);
      case 26:
        return setLoc26(content);
      case 31:
        return setLoc31(content);
      case 32:
        return setLoc32(content);
      case 33:
        return setLoc33(content);
      case 34:
        return setLoc34(content);
      case 35:
        return setLoc35(content);
      case 36:
        return setLoc36(content);
      case 41:
        return setLoc41(content);
      case 42:
        return setLoc42(content);
      case 43:
        return setLoc43(content);
      case 44:
        return setLoc44(content);
      case 45:
        return setLoc45(content);
      case 46:
        return setLoc46(content);
      case 51:
        return setLoc51(content);
      case 52:
        return setLoc52(content);
      case 53:
        return setLoc53(content);
      case 54:
        return setLoc54(content);
      case 55:
        return setLoc55(content);
      case 56:
        return setLoc56(content);
      case 62:
        return setLoc62(content);
      case 63:
        return setLoc63(content);
      case 64:
        return setLoc64(content);
      case 65:
        return setLoc65(content);
    }
  };

  function convertPiece(value) {
    switch(value){
      case "rp":
        return red_pawn;
      case "gp":
        return green_pawn;
      case "bp":
        return blue_pawn;
      case "yp":
        return yellow_pawn;
      case "rr":
        return red_rook;
      case "gr":
        return green_rook;
      case "br":
        return blue_rook;
      case "yr":
        return yellow_rook;
      case "rn":
        return red_knight;
      case "gn":
        return green_knight;
      case "bn":
        return blue_knight;
      case "yn":
        return yellow_knight;
      case "rb":
        return red_bishop;
      case "gb":
        return green_bishop;
      case "bb":
        return blue_bishop;
      case "yb":
        return yellow_bishop;
      case "rq":
        return red_queen;
      case "gq":
        return green_queen;
      case "bq":
        return blue_queen;
      case "yq":
        return yellow_queen;
      case "rk":
        return red_king;
      case "gk":
        return green_king;
      case "bk":
        return blue_king;
      case "yk":
        return yellow_king;
      default:
        return empty;
    }
  };

  return (
    <div className="board">
      <div className="row" id="row_1">
        <Space color={"space--empty"} id={"01"} occupant={empty} />
        <Space color={"space--green"} id={"12"} occupant={loc12} />
        <Space color={"space--green"} id={"13"} occupant={loc13} />
        <Space color={"space--green"} id={"14"} occupant={loc14} />
        <Space color={"space--green"} id={"15"} occupant={loc15} />
        <Space color={"space--empty"} id={"02"} occupant={empty} />
      </div>
      <div className="row" id="row_2">
        <Space color={"space--red"} id={"21"} occupant={loc21} />
        <Space color={empty} id={"22"} occupant={loc22} />
        <Space color={empty} id={"23"} occupant={loc23} />
        <Space color={empty} id={"24"} occupant={loc24} />
        <Space color={empty} id={"25"} occupant={loc25} />
        <Space color={"space--blue"} id={"26"} occupant={loc26} />
      </div>
      <div className="row" id="row_3">
        <Space color={"space--red"} id={"31"} occupant={loc31} />
        <Space color={empty} id={"32"} occupant={loc32} />
        <Space color={empty} id={"33"} occupant={loc33} />
        <Space color={empty} id={"34"} occupant={loc34} />
        <Space color={empty} id={"35"} occupant={loc35} />
        <Space color={"space--blue"} id={"36"} occupant={loc36}  />
      </div>
      <div className="row" id="row_4">
        <Space color={"space--red"} id={"41"} occupant={loc41}  />
        <Space color={empty} id={"42"} occupant={loc42} />
        <Space color={empty} id={"43"} occupant={loc43} />
        <Space color={empty} id={"44"} occupant={loc44} />
        <Space color={empty} id={"45"} occupant={loc45} />
        <Space color={"space--blue"} id={"46"} occupant={loc46} />
      </div>
      <div className="row" id="row_5">
        <Space color={"space--red"} id={"51"} occupant={loc51} />
        <Space color={empty} id={"52"} occupant={loc52} />
        <Space color={empty} id={"53"} occupant={loc53} />
        <Space color={empty} id={"54"} occupant={loc54} />
        <Space color={empty} id={"55"} occupant={loc55} />
        <Space color={"space--blue"} id={"56"} occupant={loc56} />
      </div>
      <div className="row" id="row_6">
        <Space color={"space--empty"} id={"03"} occupant={empty} />
        <Space color={"space--yellow"} id={"62"} occupant={loc62} />
        <Space color={"space--yellow"} id={"63"} occupant={loc63} />
        <Space color={"space--yellow"} id={"64"} occupant={loc64} />
        <Space color={"space--yellow"} id={"65"} occupant={loc65} />
        <Space color={"space--empty"} id={"04"} occupant={empty} />
      </div>
    </div>
  );
};

export default Board;