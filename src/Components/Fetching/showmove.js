export default async function showmove(boardId, spaceId) {
  const res = await fetch(`https://tunnelbrawl.onrender.com/boards/show_moves/${boardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      active_piece: `loc${spaceId}`
    }),
  });
  return res;
};