export default async function movepiece(boardId, activePiece, spaceId) {
  const res = await fetch(`boards/move_piece/${boardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start_loc: `loc${activePiece}`,
      end_loc: `loc${spaceId}`
    })
  });
  return res;
};