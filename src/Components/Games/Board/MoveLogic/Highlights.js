export function clearHighlight(board) {
  const clearBoard = board.map((space) => {
    return {...space, contents: {...space.contents, highlight: "highlight--none"}}
  });
  return clearBoard;
};

export function highlight(board, activePiece, {piece, capture}) {
  const clearBoard = clearHighlight(board);
  const moveBoard = clearBoard.filter(({loc}) => piece.includes(loc));
  const captureBoard = clearBoard.filter(({loc}) => capture.includes(loc));
  const activeBoard = clearBoard.find(({loc}) => loc === activePiece.loc);
  const moveLit = moveBoard.map((space) => {
    return {...space, contents: {...space.contents, highlight: "highlight--move"}}
  });
  const captureLit = captureBoard.map((space) => {
    return {...space, contents: {...space.contents, highlight: "highlight--capture"}}
  });
  const activeLit = {...activeBoard, contents: {...activeBoard.contents, highlight: "highlight--active"}};
  const boardArrSansMove = clearBoard.filter(({loc}) => !piece.includes(loc));
  const boardArrSansMoveCapture = boardArrSansMove.filter(({loc}) => !capture.includes(loc));
  const boardArrSansAll = boardArrSansMoveCapture.filter(({loc}) => loc !== activePiece.loc);
  return [...boardArrSansAll, ...captureLit, ...moveLit, activeLit];
};