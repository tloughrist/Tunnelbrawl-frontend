import React, { useState, useEffect, createContext } from "react";
import Space from "./Space";
import {knightMoves, bishopMoves, rookMoves, queenMoves, kingMoves, pawnMoves} from "./LegalMoves.js";

export const BoardContext = createContext();

function Board({ game, games, setGames }) {

  const empty = <div className="empty" onClick={populateBoard} ></div>;
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

  const [boardArr, setBoardArr] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [moved, setMoved] = useState(false);

  let activePiece = "";

  useEffect(() => {
    if (game) {
      setBoardArr(convert(game.board));
      setIsLoaded(true);
      setMoved(false);
    }
  }, [game]);

  useEffect(() => {
    if (moved) {
      if (window.confirm("Confirm move?")) {
        //submitBoard(boardArr);
        console.log(boardArr)
      } else {
        populateBoard();
      }
    }
  }, [moved]);

  function populateBoard() {
    setBoardArr(convert(game.board));
  }

  function showMoves(e) {
    const color = e.target.classList[0];
    const type = e.target.classList[1];
    const space = parseInt(e.target.parentNode.id);
    const board = convert(game.board);
    activePiece = board.find(({loc}) => loc === space);
    let moves = "";
    switch(type) {
      case "pawn":
        moves = pawnMoves(space, board, color);
        break;
      case "rook":
        moves = rookMoves(space, board, color);
        break;
      case "knight":
        moves = knightMoves(space, board, color);
        break;
      case "bishop":
        moves = bishopMoves(space, board, color);
        break;
      case "queen":
        moves = queenMoves(space, board, color);
        break;
      case "king":
        moves = kingMoves(space, board, color);
        break;
    };
    populateBoard();
    setBoardArr(tempBoard(moves, board));
  };

  function tempBoard(moves, board) {
    let boardHolder = board
    if (moves.piece.length > 0) {
      moves.piece.map((move) => {
        const spaceObj = boardHolder.find(({loc}) => loc === move);
        spaceObj.contents = {img: yellow_filter};
        const boardSans = boardHolder.filter((obj) => obj.loc !== move);
        const newBoard = [...boardSans, spaceObj];
        boardHolder = newBoard;
      });
    }
    if (moves.capture.length > 0) {
      moves.capture.map((move) => {
        const spaceObj = boardHolder.find(({loc}) => loc === move);
        spaceObj.contents = {img: red_filter};
        const boardSans = boardHolder.filter((obj) => obj.loc !== move);
        const newBoard = [...boardSans, spaceObj];
        boardHolder = newBoard;
      });
    }
    return boardHolder;
  };

  function movePiece(e) {
    //&& (game.phase === "move")
    if ((activePiece.contents.color === game.turn)) {
      populateBoard();
      const space = parseInt(e.target.parentNode.id);
      handleCapture(space);
      const board = convert(game.board);
      replaceContents(board, activePiece.loc, {img: empty});
      replaceContents(board, space, activePiece.contents)
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

  function handleCapture(space) {
  }

  function confirmMove(startLoc, finishLoc, piece) {
    if (window.confirm("Confirm move?")) {
      console.log(boardArr)
      const formatStartLoc = `loc${startLoc}`;
      const formatFinishLoc = `loc${finishLoc}`;
      const newBoard = boardArr;
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
      //setPreviousBoardArr(brd);
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

  function pieceConvert(string) {
    switch(string){
      case "rp":
        return {color: "red", type: "pawn", img: red_pawn, acro: "rp"}
      case "gp":
        return {color: "green", type: "pawn", img: green_pawn, acro: "gp"}
      case "bp":
        return {color: "blue", type: "pawn", img: blue_pawn, acro: "bp"}
      case "yp":
        return {color: "yellow", type: "pawn", img: yellow_pawn, acro: "yp"}
      case "rr":
        return {color: "red", type: "rook", img: red_rook, acro: "rr"}
      case "gr":
        return {color: "green", type: "rook", img: green_rook, acro: "gr"}
      case "br":
        return {color: "blue", type: "rook", img: blue_rook, acro: "br"}
      case "yr":
        return {color: "yellow", type: "rook", img: yellow_rook, acro: "yr"}
      case "rn":
        return {color: "red", type: "knight", img: red_knight, acro: "rn"}
      case "gn":
        return {color: "green", type: "knight", img: green_knight, acro: "gn"}
      case "bn":
        return {color: "blue", type: "knight", img: blue_knight, acro: "bn"}
      case "yn":
        return {color: "yellow", type: "knight", img: yellow_knight, acro: "yn"}
      case "rb":
        return {color: "red", type: "bishop", img: red_bishop, acro: "rb"}
      case "gb":
        return {color: "green", type: "bishop", img: green_bishop, acro: "gb"}
      case "bb":
        return {color: "blue", type: "bishop", img: blue_bishop, acro: "bb"}
      case "yb":
        return {color: "yellow", type: "bishop", img: yellow_bishop, acro: "yb"}
      case "rq":
        return {color: "red", type: "queen", img: red_queen, acro: "rq"}
      case "gq":
        return {color: "green", type: "queen", img: green_queen, acro: "gq"}
      case "bq":
        return {color: "blue", type: "queen", img: blue_queen, acro: "bq"}
      case "yq":
        return {color: "yellow", type: "queen", img: yellow_queen, acro: "yq"}
      case "rk":
        return {color: "red", type: "king", img: red_king, acro: "rk"}
      case "gk":
        return {color: "green", type: "king", img: green_king, acro: "gk"}
      case "bk":
        return {color: "blue", type: "king", img: blue_king, acro: "bk"}
      case "yk":
        return {color: "yellow", type: "king", img: yellow_king, acro: "yk"}
      default:
        return {img: empty};
    }
  };
  
  function convert(boardObj) {
    const convertedBoard = [];
    Object.keys(boardObj).forEach((key) => {
      if (key.includes('loc')) {
        const numLoc = key.substring(3);
        const spaceObj = {loc: parseInt(numLoc), contents: pieceConvert(boardObj[key])};
        convertedBoard.push(spaceObj);
      } else {
        const nonSpaceObj = {}
        nonSpaceObj[key] = boardObj[key];
        convertedBoard.push(nonSpaceObj);
      }
    });
    return convertedBoard;
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
      const contents = obj[contKey][acroKey];
      unconvertedBoard[key] = contents;
    });
    nonSpaceObjs.forEach((obj) => {
      const key = Object.keys(obj)[0];
      const contents = obj[Object.keys(obj)[0]];
      unconvertedBoard[key] = contents;
    })
    return unconvertedBoard;
  };

  return (
    isLoaded ?
      <BoardContext.Provider value={boardArr}>
        <div className="board">
          <div className="row" id="row_1">
            <div className="space empty space--empty" id={"01"}></div>
            <Space color={"space--green"} id={"12"} />
            <Space color={"space--green"} id={"13"} />
            <Space color={"space--green"} id={"14"} />
            <Space color={"space--green"} id={"15"} />
            <div className="space empty space--empty" id={"02"}></div>
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
            <div className="space empty space--empty" id={"03"}></div>
            <Space color={"space--yellow"} id={"62"} />
            <Space color={"space--yellow"} id={"63"} />
            <Space color={"space--yellow"} id={"64"} />
            <Space color={"space--yellow"} id={"65"} />
            <div className="space empty space--empty" id={"04"}></div>
          </div>
        </div>
      </BoardContext.Provider>
    : <div>
        <h3>Loading...</h3>
      </div>
  );
};

export default Board;