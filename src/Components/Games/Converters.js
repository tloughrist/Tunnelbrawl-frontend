function pieceConvert(string, click) {
  switch(string){
    case "rp":
      return {color: "red", type: "pawn", img: <img className="red pawn" src="./pieces/red_pawn.png" alt="red pawn" onClick={click} />, acro: "rp", highlight: "highlight--none"}
    case "gp":
      return {color: "green", type: "pawn", img: <img className="green pawn" src="./pieces/green_pawn.png" alt="green pawn" onClick={click} />, acro: "gp", highlight: "highlight--none"}
    case "bp":
      return {color: "blue", type: "pawn", img: <img className="blue pawn" src="./pieces/blue_pawn.png" alt="blue pawn" onClick={click} />, acro: "bp", highlight: "highlight--none"}
    case "yp":
      return {color: "yellow", type: "pawn", img: <img className="yellow pawn" src="./pieces/yellow_pawn.png" alt="yellow pawn" onClick={click} />, acro: "yp",highlight: "highlight--none"}
    case "rr":
      return {color: "red", type: "rook", img: <img className="red rook" src="./pieces/red_rook.png" alt="red rook" onClick={click} />, acro: "rr", highlight: "highlight--none"}
    case "gr":
      return {color: "green", type: "rook", img: <img className="green rook" src="./pieces/green_rook.png" alt="green rook" onClick={click} />, acro: "gr", highlight: "highlight--none"}
    case "br":
      return {color: "blue", type: "rook", img: <img className="blue rook" src="./pieces/blue_rook.png" alt="blue rook" onClick={click} />, acro: "br", highlight: "highlight--none"}
    case "yr":
      return {color: "yellow", type: "rook", img: <img className="yellow rook" src="./pieces/yellow_rook.png" alt="yellow rook" onClick={click} />, acro: "yr", highlight: "highlight--none"}
    case "rn":
      return {color: "red", type: "knight", img: <img className="red knight" src="./pieces/red_knight.png" alt="red knight" onClick={click} />, acro: "rn", highlight: "highlight--none"}
    case "gn":
      return {color: "green", type: "knight", img: <img className="green knight" src="./pieces/green_knight.png" alt="green knight" onClick={click} />, acro: "gn", highlight: "highlight--none"}
    case "bn":
      return {color: "blue", type: "knight", img: <img className="blue knight" src="./pieces/blue_knight.png" alt="blue knight" onClick={click} />, acro: "bn", highlight: "highlight--none"}
    case "yn":
      return {color: "yellow", type: "knight", img: <img className="yellow knight" src="./pieces/yellow_knight.png" alt="yellow knight" onClick={click} />, acro: "yn", highlight: "highlight--none"}
    case "rb":
      return {color: "red", type: "bishop", img: <img className="red bishop" src="./pieces/red_bishop.png" alt="red bishop" onClick={click} />, acro: "rb", highlight: "highlight--none"}
    case "gb":
      return {color: "green", type: "bishop", img: <img className="green bishop" src="./pieces/green_bishop.png" alt="green bishop" onClick={click} />, acro: "gb", highlight: "highlight--none"}
    case "bb":
      return {color: "blue", type: "bishop", img: <img className="blue bishop" src="./pieces/blue_bishop.png" alt="blue bishop" onClick={click} />, acro: "bb", highlight: "highlight--none"}
    case "yb":
      return {color: "yellow", type: "bishop", img: <img className="yellow bishop" src="./pieces/yellow_bishop.png" alt="yellow bishop" onClick={click} />, acro: "yb", highlight: "highlight--none"}
    case "rq":
      return {color: "red", type: "queen", img: <img className="red queen" src="./pieces/red_queen.png" alt="red queen" onClick={click} />, acro: "rq", highlight: "highlight--none"}
    case "gq":
      return {color: "green", type: "queen", img: <img className="green queen" src="./pieces/green_queen.png" alt="green queen" onClick={click} />, acro: "gq", highlight: "highlight--none"}
    case "bq":
      return {color: "blue", type: "queen", img: <img className="blue queen" src="./pieces/blue_queen.png" alt="blue queen" onClick={click} />, acro: "bq", highlight: "highlight--none"}
    case "yq":
      return {color: "yellow", type: "queen", img: <img className="yellow queen" src="./pieces/yellow_queen.png" alt="yellow queen" onClick={click} />, acro: "yq", highlight: "highlight--none"}
    case "rk":
      return {color: "red", type: "king", img: <img className="red king" src="./pieces/red_king.png" alt="red king" onClick={click} />, acro: "rk", highlight: "highlight--none"}
    case "gk":
      return {color: "green", type: "king", img: <img className="green king" src="./pieces/green_king.png" alt="green king" onClick={click} />, acro: "gk", highlight: "highlight--none"}
    case "bk":
      return {color: "blue", type: "king", img: <img className="blue king" src="./pieces/blue_king.png" alt="blue king" onClick={click} />, acro: "bk", highlight: "highlight--none"}
    case "yk":
      return {color: "yellow", type: "king", img: <img className="yellow king" src="./pieces/yellow_king.png" alt="yellow king" onClick={click} />, acro: "yk", highlight: "highlight--none"}
    default:
      return {type: "empty", img: <div className="empty" onClick={click} ></div>, highlight: "highlight--none"};
  }
};

function convert(boardObj, click) {
  const convertedBoard = [];
  Object.keys(boardObj).forEach((key) => {
    if (key.includes('loc')) {
      const numLoc = key.substring(3);
      const spaceObj = {loc: parseInt(numLoc), contents: pieceConvert(boardObj[key], click)};
      convertedBoard.push(spaceObj);
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