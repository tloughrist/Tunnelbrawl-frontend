export default function handleClick(e) {
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