import Piece from './Board/Pieces.js';

function pieceConvert(string) {
  switch(string){
    case "rp":
      return {color: "red", type: "pawn", img: <Piece type={"red pawn"} src={"./pieces/red_pawn.png"} alt={"red pawn"}/>, acro: "rp", highlight: "highlight--none"}
    case "gp":
      return {color: "green", type: "pawn", img: <Piece type={"green pawn"} src={"./pieces/green_pawn.png"} alt={"green pawn"}/>, acro: "gp", highlight: "highlight--none"}
    case "bp":
      return {color: "blue", type: "pawn", img: <Piece type={"blue pawn"} src={"./pieces/blue_pawn.png"} alt={"blue pawn"}/>, acro: "bp", highlight: "highlight--none"}
    case "yp":
      return {color: "yellow", type: "pawn", img: <Piece type={"yellow pawn"} src={"./pieces/yellow_pawn.png"} alt={"yellow pawn"}/>, acro: "yp",highlight: "highlight--none"}
    case "rr":
      return {color: "red", type: "rook", img: <Piece type={"red rook"} src={"./pieces/red_rook.png"} alt={"red rook"}/>, acro: "rr", highlight: "highlight--none"}
    case "gr":
      return {color: "green", type: "rook", img: <Piece type={"green rook"} src={"./pieces/green_rook.png"} alt={"green rook"}/>, acro: "gr", highlight: "highlight--none"}
    case "br":
      return {color: "blue", type: "rook", img: <Piece type={"blue rook"} src={"./pieces/blue_rook.png"} alt={"blue rook"}/>, acro: "br", highlight: "highlight--none"}
    case "yr":
      return {color: "yellow", type: "rook", img: <Piece type={"yellow rook"} src={"./pieces/yellow_rook.png"} alt={"yellow rook"}/>, acro: "yr", highlight: "highlight--none"}
    case "rn":
      return {color: "red", type: "knight", img: <Piece type={"red knight"} src={"./pieces/red_knight.png"} alt={"red knight"}/>, acro: "rn", highlight: "highlight--none"}
    case "gn":
      return {color: "green", type: "knight", img: <Piece type={"green knight"} src={"./pieces/green_knight.png"} alt={"green knight"}/>, acro: "gn", highlight: "highlight--none"}
    case "bn":
      return {color: "blue", type: "knight", img: <Piece type={"blue knight"} src={"./pieces/blue_knight.png"} alt={"blue knight"}/>, acro: "bn", highlight: "highlight--none"}
    case "yn":
      return {color: "yellow", type: "knight", img: <Piece type={"yellow knight"} src={"./pieces/yellow_knight.png"} alt={"yellow knight"}/>, acro: "yn", highlight: "highlight--none"}
    case "rb":
      return {color: "red", type: "bishop", img: <Piece type={"red bishop"} src={"./pieces/red_bishop.png"} alt={"red bishop"}/>, acro: "rb", highlight: "highlight--none"}
    case "gb":
      return {color: "green", type: "bishop", img: <Piece type={"green bishop"} src={"./pieces/green_bishop.png"} alt={"green bishop"}/>, acro: "gb", highlight: "highlight--none"}
    case "bb":
      return {color: "blue", type: "bishop", img: <Piece type={"blue bishop"} src={"./pieces/blue_bishop.png"} alt={"blue bishop"}/>, acro: "bb", highlight: "highlight--none"}
    case "yb":
      return {color: "yellow", type: "bishop", img: <Piece type={"yellow bishop"} src={"./pieces/yellow_bishop.png"} alt={"yellow bishop"}/>, acro: "yb", highlight: "highlight--none"}
    case "rq":
      return {color: "red", type: "queen", img: <Piece type={"red queen"} src={"./pieces/red_queen.png"} alt={"red queen"}/>, acro: "rq", highlight: "highlight--none"}
    case "gq":
      return {color: "green", type: "queen", img: <Piece type={"green queen"} src={"./pieces/green_queen.png"} alt={"green queen"}/>, acro: "gq", highlight: "highlight--none"}
    case "bq":
      return {color: "blue", type: "queen", img: <Piece type={"blue queen"} src={"./pieces/blue_queen.png"} alt={"blue queen"}/>, acro: "bq", highlight: "highlight--none"}
    case "yq":
      return {color: "yellow", type: "queen", img: <Piece type={"yellow queen"} src={"./pieces/yellow_queen.png"} alt={"yellow queen"}/>, acro: "yq", highlight: "highlight--none"}
    case "rk":
      return {color: "red", type: "king", img: <Piece type={"red king"} src={"./pieces/red_king.png"} alt={"red king"}/>, acro: "rk", highlight: "highlight--none"}
    case "gk":
      return {color: "green", type: "king", img: <Piece type={"green king"} src={"./pieces/green_king.png"} alt={"green king"}/>, acro: "gk", highlight: "highlight--none"}
    case "bk":
      return {color: "blue", type: "king", img: <Piece type={"blue king"} src={"./pieces/blue_king.png"} alt={"blue king"}/>, acro: "bk", highlight: "highlight--none"}
    case "yk":
      return {color: "yellow", type: "king", img: <Piece type={"yellow king"} src={"./pieces/yellow_king.png"} alt={"yellow king"}/>, acro: "yk", highlight: "highlight--none"}
    default:
      return {color: "empty", type: "empty", img: <div className={"empty"}></div>, highlight: "highlight--none"};
  }
};

export function convert(boardObj) {
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

export function unconvert(board) {
  const unconvertedBoard = {};
  const spaceObjs = board.filter((obj) => Object.keys(obj).includes('loc'));
  const nonSpaceObjs = board.filter((obj) => !Object.keys(obj).includes('loc'));
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