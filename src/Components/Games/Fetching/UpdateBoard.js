import { unconvert } from '../Converters.js';

export default async function submitBoard(boardId, board) {
  const res = await fetch(`/boards/${boardId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(unconvert(board)),
    });
  if (res.ok) {
    const brd = await res.json();
    return brd;
  } else {
    console.log(res.errors);
  }
};