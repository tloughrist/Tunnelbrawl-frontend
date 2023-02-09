import { unconvert } from '../Helpers/Converters.js';

export default async function submitBoard(boardId, board) {
  const res = await fetch(`/boards/${boardId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(unconvert(board)),
    });
  if (res.ok) {
    const pkg = await res.json();
    return pkg;
  } else {
    console.log(res.errors);
  }
};