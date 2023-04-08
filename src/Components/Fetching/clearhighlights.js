export default async function clearhighlights(boardId) {
  const res = await fetch(`boards/clear_highlights/${boardId}`, {
    method: "PUT",
  });
  return res;
};